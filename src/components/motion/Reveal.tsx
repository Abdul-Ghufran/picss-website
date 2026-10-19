"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { fadeUp, maskUp, resolve, viewport } from "@/lib/motion";

/**
 * Fires once the element has been seen — or, if hydration finished after the reader had
 * already scrolled past it, immediately on mount.
 *
 * That second case matters: `whileInView` only ever fires on an intersection, so an element
 * sitting above the viewport when Motion mounts would stay hidden forever. Anyone deep-linking
 * to an anchor or scrolling fast on a slow connection would lose that content.
 */
function useRevealTrigger(
  ref: React.RefObject<HTMLElement | null>,
  amount?: number,
) {
  const inView = useInView(ref, {
    once: true,
    amount: amount ?? viewport.amount,
    margin: viewport.margin,
  });
  const [alreadyPassed, setAlreadyPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top < 0) setAlreadyPassed(true);
  }, [ref]);

  return inView || alreadyPassed;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Pick any variant from src/lib/motion.ts. Defaults to fadeUp. */
  variants?: Variants;
  delay?: number;
  as?: ElementType;
  amount?: number;
  id?: string;
}

/**
 * The project's standard scroll entrance. Small client island so the surrounding
 * section can stay a Server Component.
 *
 * `data-reveal` is essential: globals.css uses it to force content visible when
 * JS is unavailable or reduced motion is requested.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
  amount,
  id,
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const show = useRevealTrigger(ref, amount);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      data-reveal
      className={className}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={resolve(variants, prefersReduced)}
      // Guard the falsy-zero case: `delay && ...` would pass the number 0 as the
      // transition and clobber the variant's own timing.
      transition={delay > 0 && !prefersReduced ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Editorial mask reveal: the content rises from behind its own edge.
 *
 * The trigger lives on the OUTER, unclipped wrapper and the inner element animates by
 * variant propagation. This is not a style preference — putting `whileInView` on the clipped
 * child deadlocks. A child translated fully below an `overflow-hidden` parent has an empty
 * intersection rect, so IntersectionObserver never reports it visible and the reveal can
 * never fire. That stranded every section headline on the page.
 */
export function MaskReveal({ children, className, as = "div" }: MaskRevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const show = useRevealTrigger(ref);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <MotionTag
        data-reveal
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={resolve(maskUp, prefersReduced)}
      >
        {children}
      </MotionTag>
    </div>
  );
}
