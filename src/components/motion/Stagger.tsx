"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { fadeUp, resolve, staggerParent, viewport, viewportLoose } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Seconds between children. Keep within 0.06-0.09. */
  stagger?: number;
  delayChildren?: number;
  loose?: boolean;
}

/**
 * Parent orchestrator. Pair with <StaggerItem> children.
 *
 * Like `Reveal`, this also reveals immediately when hydration lands after the reader has
 * already scrolled past — `whileInView` alone would strand the whole group.
 */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.07,
  delayChildren = 0.05,
  loose = false,
}: StaggerProps) {
  const config = loose ? viewportLoose : viewport;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: config.amount, margin: config.margin });
  const [alreadyPassed, setAlreadyPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top < 0) setAlreadyPassed(true);
  }, []);

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={inView || alreadyPassed ? "visible" : "hidden"}
      variants={staggerParent(stagger, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
}

export function StaggerItem({
  children,
  className,
  as = "div",
  variants = fadeUp,
}: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag data-reveal className={className} variants={resolve(variants, prefersReduced)}>
      {children}
    </MotionTag>
  );
}
