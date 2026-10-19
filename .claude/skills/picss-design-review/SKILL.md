---
name: picss-design-review
description: Run a structured visual, responsive, motion and accessibility review of the PICSS website in a real browser. Load this when asked to review, critique, QA, check or polish the site's appearance or behaviour, after implementing a section or motion change, and before declaring any part of the build finished. Drives the dev server and the built-in browser pane, checks the four target breakpoints, reduced motion, keyboard order and console health, and reports findings ranked by impact.
---

# PICSS design review

A review is only valid if it was actually run. Never report a pass for a check that was not
executed — say which checks could not run and why.

## 0. Bring the site up

```bash
npm run dev
```

Node lives at
`C:\Users\MABC\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.20.0-win-x64`
and is not on the Git Bash PATH by default — prepend it, or use the `preview_start` launch
config in `.claude/launch.json`, which already points at the right binary.

Open the site in the built-in browser pane (`mcp__Claude_Browser__preview_start`, then
`navigate`). Prefer `read_page` / `get_page_text` for structure and copy; use screenshots for
composition, rhythm and colour.

## 1. Breakpoints — all four, every time

`resize_window` to each, reload, then screenshot top-to-bottom:

| Target | Size | What fails here first |
|---|---|---|
| Mobile | 375 × 812 | horizontal overflow, cramped headlines, tall dead sections, unreachable menu |
| Tablet | 768 × 1024 | half-collapsed grids, orphaned columns, awkward image crops |
| Laptop | 1024 × 768 | header crowding, measure too wide, timeline rail misalignment |
| Desktop | 1440 × 900 | thin content in a wide frame, weak whitespace, broken asymmetry |

Reset with `preset: "desktop"` when finished.

Hard failures: any horizontal scroll (check
`document.documentElement.scrollWidth > window.innerWidth` via `javascript_tool`), text under
~14px, touch targets under 44px, a headline breaking to a single orphaned word.

## 2. Visual quality — judge, do not just verify

Score each and name the single worst offender:

1. **Originality** — would this read as a template or an AI default? Look for repeated
   three-card rows, uniform rounded rectangles, gradient wash, centred-everything.
2. **Typographic hierarchy** — is the eye led? Is the serif reserved for display? Measure
   65–72ch? Are eyebrow / headline / lead / body clearly distinct in size *and* role?
3. **Composition and whitespace** — is the asymmetry deliberate or accidental? Is spacing
   consistent with the scale, or are there one-off values?
4. **Section transitions** — does each dark→light handoff feel authored? Do two adjacent
   sections share a layout silhouette (a defect)?
5. **Colour discipline** — at most one red focal point per viewport. Red must read as
   punctuation. Sky blue carries data, not decoration.
6. **Imagery** — are the real publication covers crisp, correctly aspected, uncropped at the
   title?
7. **Credibility** — does it look like a research institute, or like a defence contractor /
   SaaS product / game? If the latter, that is the finding.

Resist the reflex to fix a visual weakness by adding animation or decoration. Most fixes are
subtraction, spacing, or type.

## 3. Motion

- Reload and watch the hero entrance: under ~1.6s, coordinated, no flash of unstyled or
  jumping content, no layout shift.
- Scroll the full page once at a natural speed. Reveals should feel like one system.
  Flag anything that lags behind the viewport, re-triggers, or hides content you already read.
- Confirm no element is permanently invisible because a reveal never fired: search the DOM
  for `[data-reveal]` with computed `opacity: 0` after scrolling past it.
- Hover every interactive class of element; then tab the same path and confirm the focus
  treatment is at least as clear as hover.

## 4. Reduced motion

Emulate it (`resize_window` with the browser's reduced-motion emulation, or set the OS
preference) and reload:

- All content present and static.
- No parallax, no ambient drift, no pulsing dots.
- Nothing invisible, nothing mid-transition.

## 5. Accessibility pass

- `read_page` and check the heading outline: exactly one `h1`, no skipped levels, sections
  labelled.
- Tab from the top: skip link first, visible focus throughout, logical order, no trap.
  The mobile menu must trap focus while open and return it to the toggle on close.
- Every image has meaningful `alt`; decorative SVG is `aria-hidden`.
- Form controls have real `<label>`s, error text tied by `aria-describedby`, and a live region
  for submission state.
- Contrast: body and muted text against their actual surfaces (muted-on-dark is the usual
  offender). Verify rather than assume.

## 6. Console and network

`read_console_messages({ onlyErrors: true })` and `read_network_requests` — no errors, no 404s
on assets or fonts, no hydration mismatch warnings.

## 7. Report

Rank findings by impact and state the fix, not just the symptom. Separate:

- **Defects** — broken, inaccessible, or factually wrong.
- **Design weaknesses** — works, but undersells the institution.
- **Not verified** — checks that could not be run, and why.

Then fix the highest-impact items and re-inspect the result. Content correctness is reviewed
against `client-reference/about.txt` and `docs/CONTENT-STATUS.md`, never against memory.
