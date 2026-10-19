# PICSS institutional website

Next.js site for the **Pakistan Institute for Conflict and Security Studies** — an
independent, Islamabad-based, not-for-profit think tank researching conflict, terrorism,
extremism and security in Pakistan and South Asia.

## Read these first

Three project skills carry the detail. Load the relevant one **before** you edit:

| Skill | Load before |
|---|---|
| `.claude/skills/picss-design-system` | any component, style, layout or copy change |
| `.claude/skills/motion-for-react` | any animation, scroll reveal or transition |
| `.claude/skills/picss-design-review` | reviewing, QA-ing or polishing the rendered site |

## The content rule that overrides everything

`client-reference/about.txt` is the sole source of truth for organisational claims.
Typed content lives in `src/content/site.ts`; every string there traces to that file.

**Never invent** research findings, statistics, incident data, publications, dates, URLs,
staff, quotations, partnerships, awards, citations, media mentions, impact metrics, or
internship availability. Where material is missing, render an honest awaiting-verification
state (`PendingNotice`, or `href: null` on an action) and record it in
`docs/CONTENT-STATUS.md`. The research disclaimer appears verbatim in the footer.

Conceptual graphics must be labelled illustrative and must never be mistakable for a live
incident map or real intelligence.

## Commands

Node is **not** on the Git Bash PATH. Prefix it:

```bash
export PATH="/c/Users/MABC/AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64:$PATH"
```

| Command | Purpose |
|---|---|
| `npm run dev` | dev server (port 3000, falls back to 3001) |
| `npm run build` | production build — must pass before any change is done |
| `npm run lint` | ESLint (flat config, `eslint-config-next` v16 native) |
| `npm run typecheck` | `tsc --noEmit` |

## Stack

Next.js 16.4.2 (App Router, Turbopack) · React 19.3.1 · TypeScript 5.9 ·
Tailwind CSS 4.3 (CSS-first `@theme`, no `tailwind.config`) · Motion for React 14.4 ·
lucide-react.

**GSAP is deliberately not a dependency.** The only scroll-linked value on the site is the
timeline rail, which `useScroll` handles cleanly. Add ScrollTrigger only if a genuinely
scrubbed sequence needs it — and never let it and Motion drive the same property.

## Design tokens

Palette sampled from the official logo: red `#DC2A1C`, indigo `#3D2B9B`, sky `#5CBDE0`.
Dark surfaces are indigo-tinted ink (`--color-ink-900/800/700`), light surfaces warm ivory.
Full token table and the section-by-section layout grammar live in the design-system skill.

Two contrast rules worth repeating here, because they are easy to reintroduce:

- **Do not add opacity modifiers to muted text.** `text-on-dark-muted/70` over `ink-900`
  is 4.38:1 — below AA at small sizes. Use the solid token.
- **On light surfaces, small red text uses `picss-red-deep`.** `#DC2A1C` on ivory is
  4.31:1; `#B21F14` is 6.1:1.

## Architecture

```
src/app/            layout, page, globals.css, sitemap, robots, api/enquiry
src/content/site.ts all organisational content, typed
src/components/
  layout/           SiteHeader, SiteFooter, Wordmark
  sections/         one file per page section, composed in app/page.tsx
  ui/               Button, SectionHeading, PendingNotice
  motion/           Reveal, Stagger, StaggerItem
  visuals/          RegionalVisualization, DataLattice
src/lib/            motion.ts (shared variants), cn.ts
```

Server Components by default; `"use client"` only for interaction, browser APIs or Motion,
and kept as low in the tree as possible.

## Engineering standards

- Every scroll reveal carries `data-reveal` — `globals.css` uses it to force content
  visible under reduced motion and when JS has not run. A reveal without it can strand
  content invisible; treat that as a bug.
- Animate `opacity` and `transform` only. No layout properties, no filters on scroll.
- Repeated content is typed data, never inlined JSX arrays.
- Radius tops out at 3px for controls. Structure comes from hairlines, not shadows.
- Every interactive element: visible `:focus-visible` ring, ≥44px target, accessible name.

## Before calling a change done

`npm run lint`, `npm run typecheck` and `npm run build` clean; checked at 375 / 768 / 1024 /
1440 with no horizontal overflow; tab order visible and sensible; reduced motion leaves all
content present and static; `docs/CONTENT-STATUS.md` still accurate.

## Known environment limitation

The in-app browser pane does not run `requestAnimationFrame` or IntersectionObserver while
it is hidden, so scroll-triggered motion **cannot be observed there** — reveals will appear
stuck at their hidden state. That is a pane artifact, not a site defect. To review
composition in that state, inject
`[data-reveal]{opacity:1!important;transform:none!important;}`. Live motion playback needs
a real browser window.
