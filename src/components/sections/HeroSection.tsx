"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { heroActions, organisation } from "@/content/site";
import { RegionalVisualization } from "@/components/visuals/RegionalVisualization";
import { EASE, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/cn";

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const maskLine = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.9, ease: EASE } },
};

const still = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/**
 * The hero. One orchestration parent drives the whole entrance so the wordmark rule,
 * headline, lead, actions and visualisation cannot drift out of sync. Total sequence
 * lands under ~1.7s; there is no splash screen and no blocking overlay.
 */
export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const v = prefersReduced ? still : rise;
  const line = prefersReduced ? still : maskLine;

  /* The tagline is set as three separate clauses so each can rise on its own beat. */
  const taglineClauses = ["Tracking Conflict.", "Analysing Security.", "Informing Policy."];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink-800 pt-[calc(var(--header-height)+3rem)] pb-16 sm:pb-24 lg:pt-[calc(var(--header-height)+5rem)] lg:pb-32"
    >
      {/* Fine grid, fading out before it reaches the content edge */}
      <div
        aria-hidden
        className="grid-texture pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_65%_at_60%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 right-[-10%] -z-10 size-[42rem] rounded-full bg-picss-indigo/15 blur-[140px]"
      />

      <motion.div
        className="picss-container relative"
        initial="hidden"
        animate="visible"
        variants={staggerParent(0.09, 0.12)}
      >
        <div className="picss-grid items-center">
          {/* ------------------------------------------------ Type column */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-6">
            <motion.div variants={v} className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-picss-red" />
              <span className="eyebrow text-on-dark-muted">
                {organisation.city} · Established 2014
              </span>
            </motion.div>

            <h1 className="mt-8 display text-[length:var(--step-6)] text-on-dark">
              <span className="sr-only">{organisation.tagline}</span>
              {taglineClauses.map((clause, i) => (
                <span key={clause} aria-hidden className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    variants={line}
                    className={cn(
                      "block",
                      i === 2 && "display-italic text-picss-sky",
                    )}
                  >
                    {clause}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p variants={v} className="lead measure mt-8 text-on-dark-muted">
              {organisation.summary}
            </motion.p>

            <motion.div variants={v} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href={heroActions[0].href ?? "#research"}
                className="focus-ring group inline-flex min-h-12 items-center gap-2.5 rounded-[3px] bg-picss-red px-7 text-sm font-medium text-white transition-colors duration-300 hover:bg-picss-red-deep"
              >
                {heroActions[0].label}
                <ArrowDown
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5"
                />
              </Link>

              {heroActions.slice(1).map((action) => (
                <Link
                  key={action.label}
                  href={action.href ?? "#contact"}
                  className="focus-ring inline-flex min-h-12 items-center rounded-[3px] border border-[color:var(--rule-on-dark-strong)] px-7 text-sm font-medium text-on-dark transition-colors duration-300 hover:border-picss-sky hover:text-picss-sky"
                >
                  {action.label}
                </Link>
              ))}
            </motion.div>

            {/* Institutional credentials strip — all three facts are in the source file */}
            <motion.dl
              variants={v}
              className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-[color:var(--rule-on-dark)] pt-7"
            >
              {[
                { term: "Status", detail: "Independent, not-for-profit" },
                { term: "Focus", detail: "Conflict, militancy, security" },
                { term: "Region", detail: "Pakistan & South Asia" },
              ].map((item) => (
                <div key={item.term}>
                  <dt className="eyebrow text-[0.62rem] text-picss-sky-dim">{item.term}</dt>
                  <dd className="mt-2 text-[length:var(--step--1)] leading-snug text-on-dark-muted">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ------------------------------------------- Visualisation column */}
          <motion.div
            variants={prefersReduced ? still : { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } } }}
            className="relative col-span-12 mt-16 lg:col-span-5 lg:mt-0 xl:col-span-6"
          >
            <RegionalVisualization className="mx-auto max-w-[34rem] lg:max-w-none" />

            <p className="mt-2 text-center text-[0.7rem] leading-relaxed text-on-dark-muted/70 lg:text-right">
              Illustrative research graphic — not a live incident map and not derived from
              incident data.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
