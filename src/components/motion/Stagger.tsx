"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
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

/** Parent orchestrator. Pair with <StaggerItem> children. */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.07,
  delayChildren = 0.05,
  loose = false,
}: StaggerProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={loose ? viewportLoose : viewport}
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
