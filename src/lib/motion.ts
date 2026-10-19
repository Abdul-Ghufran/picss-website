import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Every animated surface on the site draws from these
 * so timings stay coordinated rather than ad hoc.
 *
 * Rules (see the picss-design-system skill):
 *  - entrances: opacity + <=24px translate, or clip-path masks
 *  - feedback: 0.2-0.3s
 *  - never animate layout properties on scroll
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = {
  duration: 0.7,
  ease: EASE,
};

export const transitionFast: Transition = {
  duration: 0.3,
  ease: EASE,
};

/**
 * Default viewport config for scroll reveals.
 *
 * `amount` is kept low and the bottom margin pulled in so a reveal fires slightly
 * before the element is fully on screen. Tall elements (a full section heading on a
 * short viewport) can never satisfy a high threshold, which would strand them hidden.
 */
export const viewport = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" } as const;
export const viewportLoose = { once: true, amount: 0.05, margin: "0px 0px -5% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition },
};

/**
 * Editorial mask reveal — the content rises from behind its own edge.
 *
 * Implemented with transform only: the caller wraps this in an `overflow-hidden`
 * element, which does the masking. An earlier clip-path version did not animate
 * reliably (the fully-clipped hidden state meant the reveal never triggered), and
 * transforms are cheaper to composite besides.
 */
export const maskUp: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Image reveal — the image settles back from a slight scale as it fades up. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.07 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE },
  },
};

/** A hairline that draws itself across the container. */
export const ruleDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

export const staggerParent = (stagger = 0.07, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Reduced-motion equivalents: state changes, no movement. */
export const reduced: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1, transition: { duration: 0 } },
};

/** Pick the right variant set for the user's motion preference. */
export function resolve(variants: Variants, prefersReduced: boolean | null): Variants {
  return prefersReduced ? reduced : variants;
}
