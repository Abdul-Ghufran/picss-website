"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Conceptual research visualisation for the hero.
 *
 * Deliberately ABSTRACT: a graticule, contour rings and an analytical node network.
 * It carries no national borders, no place names and no incident data — it must not be
 * mistakable for a live incident map or a source of intelligence. Borders are also
 * omitted because any depiction of this region's boundaries is a factual and political
 * claim the client has not supplied. See docs/CONTENT-STATUS.md.
 */
export function RegionalVisualization({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const R = 230;
  const CX = 300;
  const CY = 300;

  /* Meridians: ellipses of decreasing width, giving the read of a rotating globe. */
  const meridians = [0.18, 0.45, 0.72, 1].map((k) => k * R);
  /* Parallels: chords across the sphere at even latitudes. */
  const parallels = [-0.72, -0.4, 0, 0.4, 0.72].map((k) => k * R);

  /* Analytical node network — positions are decorative, not locations. */
  const nodes = [
    { x: 262, y: 206, r: 3.4 },
    { x: 338, y: 258, r: 2.6 },
    { x: 226, y: 302, r: 2.6 },
    { x: 352, y: 352, r: 3.4 },
    { x: 282, y: 384, r: 2.2 },
    { x: 196, y: 246, r: 2.2 },
  ];
  const links: Array<[number, number]> = [
    [0, 1],
    [1, 3],
    [0, 2],
    [2, 4],
    [3, 4],
    [5, 0],
    [2, 5],
  ];

  const draw = (delay: number, duration = 1.4) =>
    prefersReduced
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: 1,
          opacity: 1,
          transition: { pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.4, delay } },
        };

  return (
    <div className={cn("relative", className)} aria-hidden>
      <svg
        viewBox="0 0 600 600"
        fill="none"
        className={cn(
          "h-auto w-full",
          !prefersReduced && "motion-safe:[animation:picss-drift_14s_ease-in-out_infinite]",
        )}
        role="presentation"
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#3D2B9B" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#3D2B9B" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#3D2B9B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-sweep`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5CBDE0" stopOpacity="0" />
            <stop offset="50%" stopColor="#5CBDE0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#5CBDE0" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${uid}-sphere`}>
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </defs>

        {/* Atmospheric field */}
        <circle cx={CX} cy={CY} r={R * 1.3} fill={`url(#${uid}-glow)`} />

        {/* Outer measurement rings */}
        {[R * 1.18, R * 1.1].map((r, i) => (
          <motion.circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            stroke="#5CBDE0"
            strokeOpacity={i === 0 ? 0.24 : 0.14}
            strokeWidth={1}
            strokeDasharray={i === 0 ? "2 10" : undefined}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReduced ? 0 : 1.2, ease: EASE, delay: 0.1 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
        ))}

        {/* Sphere edge */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={R}
          stroke="#5CBDE0"
          strokeOpacity={0.6}
          strokeWidth={1.4}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={draw(0.15, 1.6)}
        />

        <g clipPath={`url(#${uid}-sphere)`}>
          {/* Graticule — meridians */}
          {meridians.map((rx, i) => (
            <motion.ellipse
              key={`m-${rx}`}
              cx={CX}
              cy={CY}
              rx={rx}
              ry={R}
              stroke="#5CBDE0"
              strokeOpacity={0.28}
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={draw(0.3 + i * 0.07, 1.3)}
            />
          ))}

          {/* Graticule — parallels */}
          {parallels.map((dy, i) => {
            const halfWidth = Math.sqrt(Math.max(R * R - dy * dy, 0));
            return (
              <motion.line
                key={`p-${dy}`}
                x1={CX - halfWidth}
                y1={CY + dy}
                x2={CX + halfWidth}
                y2={CY + dy}
                stroke="#5CBDE0"
                strokeOpacity={dy === 0 ? 0.48 : 0.24}
                strokeWidth={dy === 0 ? 1.2 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={draw(0.42 + i * 0.07, 1.1)}
              />
            );
          })}

          {/* Contour detail — the "terrain" read */}
          {[0.34, 0.5, 0.66].map((k, i) => (
            <motion.path
              key={`c-${k}`}
              d={contour(CX - 20, CY + 10, R * k)}
              stroke="#B9D5DE"
              strokeOpacity={0.24}
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={draw(0.7 + i * 0.12, 1.5)}
            />
          ))}

          {/* Analytical sweep — slow, ambient, decorative only */}
          {!prefersReduced && (
            <motion.line
              x1={CX}
              y1={CY - R}
              x2={CX}
              y2={CY + R}
              stroke={`url(#${uid}-sweep)`}
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0], x: [-R * 0.9, R * 0.9] }}
              transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatDelay: 3, delay: 2 }}
            />
          )}
        </g>

        {/* Network links */}
        {links.map(([a, b], i) => (
          <motion.line
            key={`l-${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#B9D5DE"
            strokeOpacity={0.5}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(1 + i * 0.08, 0.9)}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={`n-${node.x}-${node.y}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, ease: EASE, delay: prefersReduced ? 0 : 1.25 + i * 0.07 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/*
              Deliberately NOT a red alert marker. A pulsing red dot on a globe reads as a
              live incident pin, which this graphic must never imply. The focal node is a
              quiet ring in the analytical sky tone instead.
            */}
            {i === 0 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r * 2.6}
                fill="none"
                stroke="#5CBDE0"
                strokeOpacity={0.5}
                strokeWidth={0.9}
              />
            )}
            <circle cx={node.x} cy={node.y} r={node.r} fill={i === 0 ? "#5CBDE0" : "#B9D5DE"} />
          </motion.g>
        ))}

        {/* Corner registration marks — the instrument-panel detail */}
        {[
          [84, 84, 1, 1],
          [516, 84, -1, 1],
          [84, 516, 1, -1],
          [516, 516, -1, -1],
        ].map(([x, y, sx, sy]) => (
          <motion.path
            key={`r-${x}-${y}`}
            d={`M ${x} ${y + 18 * sy} L ${x} ${y} L ${x + 18 * sx} ${y}`}
            stroke="#E9ECF4"
            strokeOpacity={0.34}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(1.5, 0.6)}
          />
        ))}
      </svg>
    </div>
  );
}

/** A closed, irregular contour ring — suggests terrain without describing any real place. */
function contour(cx: number, cy: number, r: number): string {
  const points = 14;
  const wobble = [1.0, 1.07, 0.93, 1.05, 0.9, 1.08, 0.96, 1.02, 0.88, 1.06, 0.94, 1.1, 0.92, 1.03];
  const coords = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2;
    const radius = r * wobble[i % wobble.length];
    return [cx + Math.cos(angle) * radius * 1.25, cy + Math.sin(angle) * radius * 0.78];
  });

  return (
    coords
      .map(([x, y], i) => {
        if (i === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
        const [px, py] = coords[i - 1];
        const mx = (px + x) / 2;
        const my = (py + y) / 2;
        return `Q ${px.toFixed(1)} ${py.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}
