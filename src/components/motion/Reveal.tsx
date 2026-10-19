"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { fadeUp, resolve, viewport } from "@/lib/motion";

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
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      data-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { once: true, amount } : viewport}
      variants={resolve(variants, prefersReduced)}
      // Guard the falsy-zero case: `delay && ...` would pass the number 0 as the
      // transition and clobber the variant's own timing.
      transition={delay > 0 && !prefersReduced ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
