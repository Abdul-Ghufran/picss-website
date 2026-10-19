import { test, expect } from "@playwright/test";

/**
 * Focus must be verified with real keyboard navigation.
 *
 * `element.focus()` does not reliably set :focus-visible — that is a heuristic the browser
 * applies to keyboard interaction — so a programmatic focus test can report the UA default
 * ring and look like a pass. These tests press Tab.
 */

test("tabbing from the top reaches the skip link, then the header, with a visible ring", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1200);

  const seen: Array<{ tag: string; label: string; outline: string; matchesFocusVisible: boolean }> = [];

  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 36),
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        matchesFocusVisible: el.matches(":focus-visible"),
      };
    });
    if (info) seen.push(info);
  }

  console.log(JSON.stringify(seen, null, 1));

  expect(seen.length, "tabbing must move focus").toBeGreaterThan(5);
  expect(seen[0].label, "the skip link must come first").toMatch(/skip to main content/i);

  for (const s of seen) {
    expect(s.matchesFocusVisible, `${s.tag} "${s.label}" should match :focus-visible`).toBe(true);
    const width = parseFloat(s.outline);
    expect(width, `${s.tag} "${s.label}" needs a >=2px ring, got ${s.outline}`).toBeGreaterThanOrEqual(2);
  }
});

test("the skip link jumps to main content", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(800);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  expect(page.url()).toContain("#main");
});

test("the mobile menu traps focus and returns it to the toggle", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.waitForTimeout(1000);

  const toggle = page.locator('header button[aria-controls="mobile-navigation"]');
  await toggle.click();
  await page.waitForTimeout(500);

  // Tab well past the number of links; focus must stay inside the panel.
  for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
  const insidePanel = await page.evaluate(
    () => !!document.getElementById("mobile-navigation")?.contains(document.activeElement),
  );
  expect(insidePanel, "focus must stay inside the open menu").toBe(true);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const backOnToggle = await page.evaluate(
    () => document.activeElement?.getAttribute("aria-controls") === "mobile-navigation",
  );
  expect(backOnToggle, "Escape must return focus to the toggle").toBe(true);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("the focus ring is the brand sky colour immediately, not faded in", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  // Read with no dwell: Tailwind's transition-colors covers outline-color, so a ring that
  // animates would still be showing the element's text colour at this instant.
  const immediately = await page.evaluate(
    () => getComputedStyle(document.activeElement as HTMLElement).outlineColor,
  );
  console.log("focus ring at t=0:", immediately);
  expect(immediately, "focus ring must be sky blue the moment focus lands").toBe("rgb(92, 189, 224)");
});
