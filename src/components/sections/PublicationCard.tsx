"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";
import type { Publication } from "@/content/site";
import { EASE, imageReveal, resolve, viewport } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface PublicationCardProps {
  publication: Publication;
  /** The first card is given a wider span and a larger cover. */
  featured?: boolean;
}

export function PublicationCard({ publication, featured = false }: PublicationCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      data-reveal
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={resolve(
        { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } },
        prefersReduced,
      )}
      whileHover={prefersReduced ? undefined : { y: -5 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn("group flex h-full flex-col", featured && "sm:flex-row sm:gap-10")}
    >
      {/*
        Cover. The supplied artwork is roughly 360-400px wide, so the rendered box is
        capped well below that to keep the covers crisp rather than upscaled.
      */}
      <div className={cn("shrink-0", featured ? "sm:w-[38%] sm:max-w-[22rem]" : "max-w-[18rem]")}>
        <div className="relative overflow-hidden bg-ivory-dim">
          <motion.div
            variants={resolve(imageReveal, prefersReduced)}
            className="relative aspect-[2/3] w-full"
          >
            {publication.cover ? (
              <Image
                src={publication.cover}
                alt={publication.coverAlt}
                fill
                sizes={featured ? "(max-width: 640px) 90vw, 352px" : "(max-width: 640px) 90vw, 288px"}
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center border border-dashed border-[color:var(--rule-on-light-strong)] p-6 text-center">
                <span className="eyebrow text-on-light-muted">Cover awaiting client supply</span>
              </div>
            )}
          </motion.div>

          {/* Hairline frame */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-[color:var(--rule-on-light)]"
          />
        </div>
      </div>

      {/* Record */}
      <div className={cn("flex flex-1 flex-col pt-6", featured && "sm:pt-2")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="eyebrow text-picss-red-deep">{publication.category}</span>
          {publication.date && (
            <span className="numeral text-[0.7rem] text-on-light-muted">{publication.date}</span>
          )}
        </div>

        <h3
          className={cn(
            "display mt-4 text-on-light",
            featured ? "text-[length:var(--step-3)]" : "text-[length:var(--step-1)]",
          )}
        >
          {publication.title}
        </h3>

        <p
          className={cn(
            "mt-4 leading-[1.7] text-on-light-muted",
            featured ? "measure text-[length:var(--step-0)]" : "text-[length:var(--step--1)]",
          )}
        >
          {publication.description}
        </p>

        <div className="mt-auto pt-6">
          {publication.attribution && (
            <p className="text-[0.74rem] text-on-light-muted">{publication.attribution}</p>
          )}

          {publication.href === null ? (
            <p className="mt-3 inline-flex items-center gap-2 text-[0.72rem] text-on-light-muted">
              <Lock aria-hidden className="size-3" />
              Link to be confirmed by PICSS
            </p>
          ) : (
            <a
              href={publication.href}
              className="focus-ring link-underline mt-3 inline-block text-[0.82rem] font-medium text-on-light"
            >
              Read the publication
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
