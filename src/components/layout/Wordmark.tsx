import Image from "next/image";
import { cn } from "@/lib/cn";
import { organisation } from "@/content/site";

interface WordmarkProps {
  /** `reversed` is the ivory-on-dark variant of the official logo. */
  tone?: "reversed" | "light";
  className?: string;
  width?: number;
  priority?: boolean;
}

/**
 * The official PICSS logo. The supplied asset is a JPEG on white; `scripts/` derived
 * transparent PNGs from it (see docs/ASSETS.md), including an ivory-ink reversed variant
 * for dark surfaces. Both are the client's artwork, unmodified in form.
 */
export function Wordmark({ tone = "reversed", className, width = 150, priority = false }: WordmarkProps) {
  const src = tone === "reversed" ? "/assets/picss-logo-reversed.png" : "/assets/picss-logo.png";

  return (
    <Image
      src={src}
      alt={`${organisation.name} logo`}
      width={width}
      height={Math.round((width * 316) / 466)}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}

/**
 * Typographic lockup used where the raster logo would be too small to read —
 * mirrors the official letterform colouring (indigo "C", red elsewhere).
 */
export function WordmarkType({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-sans text-xl font-semibold tracking-[-0.03em]", className)}
      aria-label={organisation.shortName}
    >
      <span aria-hidden className="text-picss-red">
        Pi
      </span>
      <span aria-hidden className="text-picss-indigo">
        C
      </span>
      <span aria-hidden className="text-picss-red">
        SS
      </span>
    </span>
  );
}
