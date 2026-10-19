"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { timeline } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { EASE, viewport } from "@/lib/motion";

/**
 * A vertical rail that fills as the section scrolls. Not pinned: pinning a six-item
 * timeline forces the reader through a long scrub on mobile for no benefit. The rail
 * progress is the only scroll-linked value, and it is disabled under reduced motion.
 */
export function InstitutionalTimeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  return (
    <section id="timeline" className="relative overflow-hidden bg-ink-900 section-pad">
      <div className="picss-container">
        <div className="picss-grid items-end">
          <SectionHeading
            index={timeline.index}
            eyebrow={timeline.eyebrow}
            headline={timeline.headline}
            tone="dark"
            align="wide"
            className="col-span-12 lg:col-span-6"
          />
          <Reveal className="col-span-12 mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <p className="measure text-[length:var(--step-0)] leading-[1.75] text-on-dark-muted">
              {timeline.lead}
            </p>
          </Reveal>
        </div>

        <div ref={railRef} className="relative mt-16 lg:mt-24">
          {/* Rail track */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-[color:var(--rule-on-dark)] sm:left-[calc(7rem+7px)] lg:left-[calc(9rem+7px)]"
          />
          {/* Rail progress */}
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-picss-red via-picss-red/70 to-picss-sky/50 sm:left-[calc(7rem+7px)] lg:left-[calc(9rem+7px)]"
            style={{ scaleY: prefersReduced ? 1 : progress }}
          />

          <ol>
            {timeline.items.map((milestone, i) => (
              <li key={milestone.id} className="relative">
                <motion.div
                  data-reveal
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: prefersReduced ? 0 : 0.7, ease: EASE }}
                  className="group grid grid-cols-[auto_1fr] gap-x-6 pb-12 sm:grid-cols-[7rem_auto_1fr] sm:gap-x-0 lg:grid-cols-[9rem_auto_1fr]"
                >
                  {/* Year — sits left of the rail from sm up */}
                  <span className="numeral col-start-2 row-start-1 pb-3 text-[0.78rem] tracking-[0.08em] text-picss-sky sm:col-start-1 sm:row-start-1 sm:pt-0.5 sm:pr-8 sm:pb-0 sm:text-right">
                    {milestone.year}
                  </span>

                  {/* Marker */}
                  <span className="relative col-start-1 row-start-1 flex w-4 justify-center pt-[0.45rem] sm:col-start-2 sm:row-span-2 sm:w-[15px]">
                    <span
                      aria-hidden
                      className="size-[7px] shrink-0 rotate-45 bg-ink-900 ring-1 ring-[color:var(--rule-on-dark-strong)] transition-colors duration-500 group-hover:bg-picss-red group-hover:ring-picss-red"
                    />
                  </span>

                  {/* Record */}
                  <div className="col-start-2 row-start-2 pl-0 sm:col-start-3 sm:row-start-1 sm:pl-8">
                    <h3 className="text-[length:var(--step-1)] leading-snug font-medium tracking-[-0.015em] text-on-dark">
                      {milestone.title}
                    </h3>
                    <p className="measure mt-3 text-[length:var(--step--1)] leading-[1.7] text-on-dark-muted">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>

                {i === timeline.items.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[7px] h-2 w-px bg-gradient-to-b from-[color:var(--rule-on-dark)] to-transparent sm:left-[calc(7rem+7px)] lg:left-[calc(9rem+7px)]"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
