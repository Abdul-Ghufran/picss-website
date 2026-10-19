"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Capability } from "@/content/site";
import { EASE, resolve, viewport } from "@/lib/motion";

const row = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: Math.min(i * 0.07, 0.35) },
  }),
};

/**
 * One capability. The hairline above each row draws in, the index shifts to red and the
 * whole row lifts slightly on hover — enough feedback to feel alive without a card.
 */
export function CapabilityRow({ item, index }: { item: Capability; index: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.li
      data-reveal
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={prefersReduced ? resolve({}, true) : row}
      className="group border-b border-[color:var(--rule-on-dark)]"
    >
      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-4 py-8 transition-colors duration-500 group-hover:bg-white/[0.02] lg:py-10">
        <span className="numeral col-span-2 pt-1.5 text-[0.72rem] text-on-dark-muted transition-colors duration-300 group-hover:text-picss-red sm:col-span-1">
          {item.index}
        </span>

        <h3 className="col-span-10 text-[length:var(--step-2)] leading-tight font-medium tracking-[-0.015em] text-on-dark sm:col-span-11 lg:col-span-5">
          {item.title}
        </h3>

        <p className="col-span-12 text-[length:var(--step--1)] leading-[1.7] text-on-dark-muted sm:col-start-2 sm:col-end-13 lg:col-span-6 lg:col-start-7 lg:pt-1">
          {item.description}
        </p>
      </div>
    </motion.li>
  );
}
