"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { EASE, viewport } from "@/lib/motion";

/**
 * Conceptual visual for the Militancy Database section.
 *
 * This is a DIAGRAM OF STRUCTURE, not of data. It shows records resolving into a grid
 * lattice with district and time axes — it carries no values, no counts, no place names
 * and no dates, because PICSS has supplied no data and inventing any would misrepresent
 * the institute's research. See docs/CONTENT-STATUS.md.
 */
export function DataLattice({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const cols = 14;
  const rows = 9;
  const cell = 26;
  const gap = 4;
  const w = cols * (cell + gap);
  const h = rows * (cell + gap);

  /* A fixed, hand-chosen pattern. Deterministic so it never implies sampled data. */
  const pattern = [
    0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 3, 0, 0, 1,
    0, 1, 0, 2, 0, 0, 1, 0, 3, 0, 0, 1, 0, 0,
    1, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 2, 0,
    0, 2, 1, 0, 0, 0, 3, 0, 1, 0, 2, 0, 0, 1,
    0, 0, 0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0,
    2, 0, 1, 0, 3, 0, 0, 1, 0, 2, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 2, 0, 0, 1, 3, 0, 0, 2,
    1, 0, 2, 0, 0, 1, 0, 0, 3, 0, 1, 0, 2, 0,
    0, 0, 1, 2, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0,
  ];

  const tone = ["rgba(233,236,244,0.07)", "rgba(92,189,224,0.30)", "rgba(92,189,224,0.60)", "rgba(220,42,28,0.75)"];

  return (
    <div className={className} aria-hidden>
      <svg viewBox={`0 0 ${w} ${h + 34}`} fill="none" className="h-auto w-full" role="presentation">
        <defs>
          <clipPath id={`${uid}-clip`}>
            <rect x="0" y="0" width={w} height={h} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${uid}-clip)`}>
          {pattern.map((value, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            return (
              <motion.rect
                key={i}
                x={col * (cell + gap)}
                y={row * (cell + gap)}
                width={cell}
                height={cell}
                rx={1}
                fill={tone[value]}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{
                  duration: prefersReduced ? 0 : 0.5,
                  ease: EASE,
                  delay: prefersReduced ? 0 : (col * 0.018 + row * 0.03),
                }}
                style={{ transformOrigin: `${col * (cell + gap) + cell / 2}px ${row * (cell + gap) + cell / 2}px` }}
              />
            );
          })}
        </g>

        {/* Axes — labelled by dimension, never by value */}
        <motion.line
          x1={0}
          y1={h + 10}
          x2={w}
          y2={h + 10}
          stroke="rgba(233,236,244,0.22)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewport}
          transition={{ duration: prefersReduced ? 0 : 1, ease: EASE, delay: 0.3 }}
        />
        <text
          x={0}
          y={h + 28}
          fill="rgba(155,166,194,0.9)"
          fontSize="10"
          letterSpacing="2.2"
          fontFamily="var(--font-mono)"
        >
          TIME →
        </text>
        <text
          x={w}
          y={h + 28}
          textAnchor="end"
          fill="rgba(155,166,194,0.9)"
          fontSize="10"
          letterSpacing="2.2"
          fontFamily="var(--font-mono)"
        >
          ↑ DISTRICT
        </text>
      </svg>
    </div>
  );
}
