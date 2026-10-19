---
name: motion-for-react
description: Animation patterns for this repository using Motion for React (the `motion` package, v14, imported from `motion/react`) together with GSAP ScrollTrigger. Load this before writing or editing any animation, scroll reveal, hover transition, SVG line-drawing effect or reduced-motion branch. Covers the correct import paths under the Next.js App Router, the project's shared variants in src/lib/motion.ts, server/client component boundaries, and the performance and accessibility rules animations here must satisfy.
---

# Motion for React — patterns used in this project

Installed: `motion@14.4.0` (the renamed successor to `framer-motion`; `motion/react`
re-exports the full `framer-motion` surface). GSAP is **not** installed — see section 9.

## 1. Imports and the client boundary

```tsx
"use client";
import { motion, useReducedMotion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
```

- Always import from `motion/react`, never from `framer-motion` directly and never from
  the bare `motion` root (that entry is the vanilla DOM API).
- Any file touching `motion` needs `"use client"`. Keep that boundary **low** in the tree:
  animate with small client wrappers (`Reveal`, `Stagger`) and leave the surrounding
  sections as Server Components. Do not mark a whole section client just to fade in a heading.
- `motion/react-m` + `LazyMotion` exist for bundle trimming. This project does not use them —
  the shared primitives already keep the client surface small, and mixing `m` with `motion`
  in one tree is a common source of "motion component without LazyMotion features" errors.

## 2. The shared vocabulary — always start here

`src/lib/motion.ts` exports the project's variants and timings:
`EASE`, `transition`, `transitionFast`, `viewport`, `fadeUp`, `fadeIn`, `fadeRight`,
`maskUp`, `imageReveal`, `ruleDraw`, `staggerParent()`, `reduced`, `resolve()`.

Never hand-roll a duration/easing inline. If a new motion is genuinely needed, add a named
variant to that file so it stays part of the system.

## 3. Scroll reveals

Use `whileInView` with the shared viewport config — not `useInView` + state, and not
ScrollTrigger:

```tsx
<motion.div
  data-reveal
  initial="hidden"
  whileInView="visible"
  viewport={viewport}            // { once: true, amount: 0.25 }
  variants={resolve(fadeUp, prefersReduced)}
/>
```

`data-reveal` is required: `globals.css` uses it to force content visible under
`prefers-reduced-motion` and in the no-JS fallback. A reveal without it can hide content
permanently if JS fails — treat a missing `data-reveal` as a bug.

Stagger lists with a parent/child pair rather than per-item delays:

```tsx
<motion.ul initial="hidden" whileInView="visible" viewport={viewport} variants={staggerParent(0.07)}>
  {items.map((i) => <motion.li key={i.id} data-reveal variants={resolve(fadeUp, prefersReduced)} />)}
</motion.ul>
```

Stagger 0.06–0.09s. Never stagger more than ~8 children — beyond that the tail reads as lag.

## 4. Reduced motion

```tsx
const prefersReduced = useReducedMotion();          // boolean | null
<motion.div variants={resolve(fadeUp, prefersReduced)} />
```

`useReducedMotion()` returns `null` on the server/first render, which `resolve()` treats as
"animate". The CSS media query in `globals.css` is the belt-and-braces layer: it zeroes
durations and forces `[data-reveal]` visible, so the preference is honoured even before
hydration. Ambient CSS animations (`picss-drift`, `picss-pulse-dot`) are covered by that
same block — anything new and decorative must be too.

For continuous ambient motion, gate the whole effect rather than shortening it:

```tsx
{!prefersReduced && <AmbientLayer />}
```

## 5. Scroll-linked values

`useScroll` + `useTransform` for parallax and progress rails:

```tsx
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
<motion.div ref={ref} style={{ y: prefersReduced ? 0 : y }} />
```

Rules: parallax budget is ±8% translate, transforms only. Never drive `top`, `height`,
`margin` or `backgroundPosition` from scroll. Disable parallax entirely under reduced motion
(pass the raw `0`, as above — do not conditionally call the hook).

## 6. SVG line drawing

Use `pathLength` rather than manual `stroke-dasharray` arithmetic:

```tsx
<motion.path
  d={d} fill="none" stroke="currentColor"
  initial={{ pathLength: 0, opacity: 0 }}
  whileInView={{ pathLength: 1, opacity: 1 }}
  viewport={viewport}
  transition={{ duration: 1.6, ease: EASE }}
/>
```

Motion sets `pathLength="1"` normalisation for you. For looping ambient strokes prefer the
CSS `picss-sweep` keyframe so the work stays off the main thread's React path.

## 7. Hover and press feedback

Prefer CSS transitions for simple hovers (see `.link-underline` in `globals.css`); reach for
Motion when the interaction needs coordinated multi-element or spring behaviour.

```tsx
<motion.article whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }} transition={transitionFast} />
```

Hover must never be the only way to reach information or an action, and every hover target
needs a matching `:focus-visible` treatment.

## 8. Orchestrating an entrance (the hero)

The hero uses a single parent with `initial="hidden" animate="visible"` and
`staggerParent(0.09, 0.15)`. Keep the whole sequence under ~1.6s to last pixel — no splash
screen, no blocking overlay, no artificial loading state. The headline, lead, actions and
visualisation are children of that one orchestration so they cannot drift out of sync.

## 9. GSAP / ScrollTrigger

Not a dependency here, and that is intentional: the only scroll-linked value on the site is
the timeline rail, which `useScroll` handles. If a genuinely scrubbed sequence ever needs
it, install it then and follow this shape:

```tsx
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => { /* ... */ }, ref);
  return () => ctx.revert();          // mandatory — StrictMode double-invokes effects
}, []);
```

Never let GSAP and Motion animate the same element or property. Register plugins inside the
effect, not at module scope (it breaks SSR).

## 10. Performance checklist

- Animate `opacity` and `transform` only.
- No `will-change` sprayed across the page; let the compositor decide.
- Offscreen ambient loops must be cheap — SVG/CSS, not canvas or WebGL.
- `once: true` on every reveal; re-triggering reveals on scroll-up reads as jitter.
- Do not animate blur, box-shadow, or filters on scroll.
- Verify no layout shift: reveals move content with `transform`, never by changing flow.
