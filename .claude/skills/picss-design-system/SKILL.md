---
name: picss-design-system
description: The PICSS website's art direction, design tokens, typography scale, layout grammar and content-integrity rules. Load this before creating or editing any component, section, style or copy in this repository, and before changing colours, spacing, type or imagery. Covers the logo-derived palette, the section rhythm, the "what must never be fabricated" content contract, and the component conventions used across src/components.
---

# PICSS Design System

The Pakistan Institute for Conflict and Security Studies (PICSS) is an independent,
Islamabad-based, not-for-profit think tank. The site must read as **contemporary
geopolitical intelligence meets premium editorial publishing** — a serious research
institution, never a military outfit, a security-software vendor, or an entertainment brand.

## 1. Content integrity contract (non-negotiable)

`client-reference/about.txt` is the single source of truth for every organisational claim.
Typed content lives in `src/content/site.ts` and must trace back to that file.

**Never fabricate.** Specifically, never invent:

- research findings, statistics, incident counts, casualty figures or live data;
- publications, publication dates, cover artwork presented as official, or external URLs;
- staff, biographies, testimonials or quotations;
- partnerships, awards, rankings or endorsements beyond those documented
  (NACTA, Royal Danish Defence College, Fatima Jinnah Women University,
  Foundation University, University of Sargodha);
- media mentions, citations or impact metrics;
- internship availability, eligibility, deadlines or selection criteria.

Rules that follow from this:

- Conceptual visuals must be **labelled as illustrative** and must not be mistakable for a
  live incident map or real intelligence. The regional visualisation carries a visible
  "Illustrative — not a live incident map" note.
- Sections awaiting verified content render an **awaiting-verification state**
  (see `src/components/ui/PendingNotice.tsx`), not invented filler.
- Destinations that are not yet confirmed are centralised in `src/content/site.ts` as
  `href: null`, which renders a non-navigating, clearly-marked control. Never point a CTA
  at a guessed URL.
- The research disclaimer from the source file appears verbatim in the footer.
- Every unverified item is tracked in `docs/CONTENT-STATUS.md`. Update it when you add or
  resolve one.

## 2. Palette — derived from the official logo

Sampled directly from `assets/picss logo.jpeg`. These are the real brand hues; do not
substitute a generic navy/brass scheme.

| Token | Value | Role |
|---|---|---|
| `--picss-red` | `#DC2A1C` | Primary accent. Rules, markers, active states, one CTA per view. Use sparingly — it is punctuation, not a surface. |
| `--picss-indigo` | `#3D2B9B` | Brand blue from the logotype. Secondary accent, deep gradients. |
| `--picss-sky` | `#5CBDE0` | Map blue. Data lines, cool highlights, link hover on dark. |
| `--ink-900` | `#070B18` | Deepest surface. |
| `--ink-800` | `#0C1226` | Primary dark surface (indigo-tinted ink, never neutral black). |
| `--ink-700` | `#141C38` | Raised dark surface, cards on dark. |
| `--ivory` | `#F5F3EE` | Primary light surface, warm not white. |
| `--ivory-dim` | `#E8E4DA` | Light surface hairlines and wells. |
| `--paper` | `#FFFFFF` | Highest light surface. |

Text: `--text-on-dark` `#E9ECF4`, `--text-on-dark-muted` `#9BA6C2` (≥4.5:1 on `--ink-800`),
`--text-on-light` `#161B2B`, `--text-on-light-muted` `#53596B`.

Hairlines are the signature detail: `--rule-on-dark` `rgba(233,236,244,.14)`,
`--rule-on-light` `rgba(22,27,43,.12)`. Thin rules, not shadows, define structure.

**Discipline:** no gradient wallpaper, no glassmorphism, no neon. Contrast comes from
composition, type, spacing and alternating dark/light surfaces. At most one red element
competing for attention per viewport.

## 3. Typography

- **Display serif** — `Fraunces` (variable, optical sizing). Major section headlines and the
  hero only. Never for body or UI.
- **Sans** — `Inter`. Body, navigation, metadata, buttons, everything else.
- **Mono** — `JetBrains Mono`. Section numerals (`01.`, `02.`), dates, data labels, eyebrows.
  Letter-spaced and uppercase for eyebrows.

Scale uses `clamp()` tokens defined in `globals.css` (`--step--1` … `--step-6`).
Body copy sits at 65–72ch max measure. Headlines take `text-balance`; lead paragraphs take
`text-pretty`. Do not introduce new font families or extra weights.

## 4. Layout grammar

A 12-column editorial grid (`.picss-grid`) inside `.picss-container` (max 1280px, 20px gutter
at 375px scaling to 48px). Section rhythm alternates surface and composition so no two
consecutive sections look alike:

| Section | Surface | Composition |
|---|---|---|
| Hero | dark | full-bleed, visual right / type left |
| About | light | asymmetric 5/7 editorial columns |
| Capabilities | dark | numbered index list, not a card grid |
| Publications | light | editorial cards with real covers, varied spans |
| Database | dark | data-led split with illustrative visualisation |
| Programs | light | offset feature blocks |
| Internship | dark inset | single centred column, narrow measure |
| Impact | light | four-up record ledger with awaiting-verification states |
| Timeline | dark | vertical rail, year-led |
| Collaboration | light | two-column list + enquiry panel |
| Contact | dark | split: details / form |
| Footer | deepest dark | multi-column + disclaimer |

Avoid: repeated three-card rows, heavy rounded rectangles (radius tops out at 4px for
controls, 2px for surfaces), drop-shadow stacks, and identical headline treatments.

## 5. Motion contract

See the `motion-for-react` skill for API specifics. Design rules:

- Motion serves hierarchy, storytelling, navigation or feedback. Never decoration for its own sake.
- Standard easing `[0.22, 1, 0.36, 1]`; durations 0.5–0.8s for entrances, 0.2–0.3s for feedback.
- Entrances: opacity + ≤24px translate, or clip-path mask reveals. Never animate layout
  properties (width/height/top/left) on scroll.
- Stagger children by 0.06–0.09s. Never stagger every paragraph independently.
- Viewport thresholds: `amount: 0.25`, `once: true`. Content must remain readable if JS fails —
  reveal styles are applied by Motion, and the no-JS baseline is visible content.
- `prefers-reduced-motion` must collapse every non-essential animation to an instant state
  change via the `useReducedMotion` hook and the `reduce` variants in `src/lib/motion.ts`.
- GSAP + ScrollTrigger only for genuine scrub choreography (currently: none required beyond
  the timeline rail progress). Do not let two libraries drive the same property.

## 6. Component conventions

- Server Components by default. `"use client"` only for interaction, browser APIs or Motion.
- Shared primitives live in `src/components/ui` (`Button`, `SectionHeading`, `Eyebrow`,
  `Rule`, `PendingNotice`), motion primitives in `src/components/motion`
  (`Reveal`, `Stagger`, `StaggerItem`, `TextReveal`).
- Repeated content is typed data in `src/content/site.ts`, never inlined JSX arrays.
- Sections are one file each in `src/components/sections`, composed in `src/app/page.tsx`.
- Every interactive element needs a visible `:focus-visible` ring (`.focus-ring` utility),
  a ≥44px touch target, and an accessible name.

## 7. Before you call a change done

- `npm run lint` and `npm run typecheck` clean.
- `npm run build` succeeds.
- Check 375 / 768 / 1024 / 1440px: no horizontal overflow, no broken grid, no unreadable head.
- Tab through the section; focus is visible and ordered.
- Toggle reduced motion; content is fully present and static.
- No new fabricated content; `docs/CONTENT-STATUS.md` still accurate.
