import { test, expect, type Page } from "@playwright/test";

/**
 * Motion and accessibility verification for the PICSS site.
 *
 * These run in a real Chromium, which is the point: the Claude desktop app's browser pane
 * does not run requestAnimationFrame or IntersectionObserver while it is hidden, so
 * scroll-triggered motion cannot be observed there at all.
 */

/** Scroll the whole page at a natural pace so IntersectionObserver fires normally. */
async function scrollThrough(page: Page, step = 500, dwell = 110) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" as ScrollBehavior }), y);
    await page.waitForTimeout(dwell);
  }
  await page.waitForTimeout(900); // let the last reveals settle
}

/** Every element the motion system can hide, with its resolved visual state. */
async function revealStates(page: Page) {
  return page.evaluate(() => {
    const all = [...document.querySelectorAll("[data-reveal]")];
    const hidden = all
      .filter((el) => {
        const cs = getComputedStyle(el);
        const t = cs.transform;
        const moved = t && t !== "none" && !/matrix\(1, 0, 0, 1, 0, 0\)/.test(t);
        return parseFloat(cs.opacity) < 0.99 || moved;
      })
      .map((el) => ({
        text: (el.textContent || "").trim().slice(0, 48) || "[no text]",
        section: el.closest("section")?.id ?? el.closest("footer") ? "footer" : "none",
        opacity: getComputedStyle(el).opacity,
        transform: getComputedStyle(el).transform,
      }));
    return { total: all.length, hidden };
  });
}

test.describe("scroll reveals", () => {
  test("every reveal fires during a full-page scroll", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    const { total, hidden } = await revealStates(page);
    console.log(`reveals: ${total} total, ${hidden.length} still hidden`);
    if (hidden.length) console.log(JSON.stringify(hidden.slice(0, 12), null, 1));

    expect(total).toBeGreaterThan(80);
    expect(hidden, "no [data-reveal] element may remain hidden after scrolling past it").toEqual([]);
  });

  test("no reveal is stranded on a short viewport", async ({ page }) => {
    // Tall section headings can fail a high IntersectionObserver threshold on short screens.
    await page.setViewportSize({ width: 1024, height: 600 });
    await page.goto("/");
    await scrollThrough(page, 350, 120);

    const { hidden } = await revealStates(page);
    expect(hidden, "short viewports must not strand tall headings").toEqual([]);
  });
});

test.describe("hero entrance", () => {
  test("completes quickly and leaves nothing hidden", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // The orchestration is ~1.6s to last pixel; allow headroom for dev-mode hydration.
    await page.waitForTimeout(2600);

    const hero = await page.evaluate(() => {
      const section = document.getElementById("top")!;
      const animated = [...section.querySelectorAll<HTMLElement>("h1 span span, p, dl, a")];
      const unfinished = animated
        .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99)
        .map((el) => (el.textContent || "").trim().slice(0, 40));
      const svgPaths = [...section.querySelectorAll("svg circle, svg ellipse, svg line, svg path")];
      const drawnIn = svgPaths.filter((p) => parseFloat(getComputedStyle(p).opacity) > 0.05).length;
      return { unfinished, svgTotal: svgPaths.length, svgDrawnIn: drawnIn };
    });

    console.log(`hero svg: ${hero.svgDrawnIn}/${hero.svgTotal} elements drawn in`);
    expect(hero.unfinished, "hero text and actions must finish animating").toEqual([]);
    expect(hero.svgDrawnIn, "the regional visualisation must draw itself in").toBeGreaterThan(10);
  });

  test("does not shift layout as it animates", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
          if (!entry.hadRecentInput) (window as unknown as { __cls: number }).__cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.waitForTimeout(3000);

    const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
    console.log("hero cumulative layout shift:", cls.toFixed(4));
    expect(cls, "entrance animation must not move layout").toBeLessThan(0.1);
  });
});

test.describe("timeline rail", () => {
  for (const [label, width, height] of [
    ["mobile", 375, 812],
    ["desktop", 1440, 900],
  ] as const) {
    test(`fills as the section scrolls (${label})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");

      const rail = page.locator("#timeline .origin-top").first();
      await page.evaluate(() => document.getElementById("timeline")!.scrollIntoView({ block: "start" }));
      await page.waitForTimeout(600);
      const atStart = await rail.evaluate((el) => getComputedStyle(el).transform);

      await page.evaluate(() => {
        const t = document.getElementById("timeline")!;
        window.scrollTo({ top: t.offsetTop + t.offsetHeight, behavior: "instant" as ScrollBehavior });
      });
      await page.waitForTimeout(1200);
      const atEnd = await rail.evaluate((el) => getComputedStyle(el).transform);

      const scaleY = (t: string) => {
        const m = t.match(/matrix\(([^)]+)\)/);
        return m ? parseFloat(m[1].split(",")[3]) : t === "none" ? 1 : NaN;
      };
      console.log(`${label} rail scaleY: ${scaleY(atStart).toFixed(3)} -> ${scaleY(atEnd).toFixed(3)}`);
      expect(scaleY(atEnd), "rail must grow as the timeline scrolls").toBeGreaterThan(scaleY(atStart));
      expect(scaleY(atEnd)).toBeGreaterThan(0.6);
    });
  }
});

test.describe("interaction feedback", () => {
  test("focus is visible on every interactive element type", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page, 900, 60);
    await page.evaluate(() => window.scrollTo(0, 0));

    const samples = [
      { name: "nav link", selector: 'nav[aria-label="Primary"] a' },
      { name: "hero primary CTA", selector: '#top a[href="#research"]' },
      { name: "publication link", selector: "#publications a" },
      { name: "contact email link", selector: '#contact a[href^="mailto:"]' },
      { name: "form input", selector: "#contact input[name='name']" },
      { name: "submit button", selector: '#contact button[type="submit"]' },
    ];

    for (const { name, selector } of samples) {
      const el = page.locator(selector).first();
      if ((await el.count()) === 0) continue;
      await el.focus();
      const outline = await el.evaluate((node) => {
        const cs = getComputedStyle(node);
        return { width: cs.outlineWidth, style: cs.outlineStyle, color: cs.outlineColor };
      });
      console.log(`focus ${name}: ${outline.width} ${outline.style} ${outline.color}`);
      expect(parseFloat(outline.width), `${name} needs a visible focus ring`).toBeGreaterThanOrEqual(2);
      expect(outline.style).not.toBe("none");
    }
  });

  test("hover lifts a publication card", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await scrollThrough(page, 900, 60);

    const card = page.locator("#publications article").nth(1);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const before = await card.evaluate((el) => getComputedStyle(el).transform);
    await card.hover();
    await page.waitForTimeout(500);
    const after = await card.evaluate((el) => getComputedStyle(el).transform);
    console.log(`card hover: ${before} -> ${after}`);
    expect(after, "publication card should respond to hover").not.toBe(before);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("all content is present and static", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);

    // Nothing may be hidden even BEFORE scrolling: reduced motion must not gate content.
    const beforeScroll = await page.evaluate(() => {
      const all = [...document.querySelectorAll("[data-reveal]")];
      return all.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99).length;
    });
    expect(beforeScroll, "reduced motion must not hide content behind scroll triggers").toBe(0);

    await scrollThrough(page, 900, 60);
    const { hidden } = await revealStates(page);
    expect(hidden, "nothing may remain hidden or offset under reduced motion").toEqual([]);

    // No ambient looping animation should be running.
    const animating = await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((a) => a.playState === "running")
          .map((a) => (a as CSSAnimation).animationName || "web-animation").length,
    );
    console.log("running animations under reduced motion:", animating);
    expect(animating, "no ambient animation may run under reduced motion").toBe(0);
  });

  test("key content is readable", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Tracking Conflict");
    await expect(page.getByText("Structured data for understanding conflict.")).toBeVisible();
    await expect(page.getByText("should not be treated as guarantees of future events")).toBeVisible();
  });
});

test.describe("page health", () => {
  test("no console errors and no failed requests", async ({ page }) => {
    const errors: string[] = [];
    const failed: string[] = [];

    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });

    await page.goto("/");
    await scrollThrough(page, 700, 90);

    // Dev-only noise from the HMR/devtools channel is not a site defect.
    const real = errors.filter((e) => !/HMR|react-devtools|Download the React/i.test(e));
    console.log("console errors:", real.length, "failed requests:", failed.length);
    if (real.length) console.log(real.slice(0, 5));
    if (failed.length) console.log(failed.slice(0, 5));

    expect(real).toEqual([]);
    expect(failed).toEqual([]);
  });

  test("no horizontal overflow at any breakpoint", async ({ page }) => {
    for (const [w, h] of [[375, 812], [768, 1024], [1024, 768], [1440, 900]] as const) {
      await page.setViewportSize({ width: w, height: h });
      await page.goto("/");
      await scrollThrough(page, 1200, 50);
      const overflow = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        inner: window.innerWidth,
      }));
      console.log(`${w}px: scrollWidth ${overflow.scrollW} vs ${overflow.inner}`);
      expect(overflow.scrollW, `horizontal overflow at ${w}px`).toBeLessThanOrEqual(overflow.inner + 1);
    }
  });
});
