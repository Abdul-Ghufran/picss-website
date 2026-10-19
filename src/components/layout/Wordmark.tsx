import Image from "next/image";
import { cn } from "@/lib/cn";
import { organisation } from "@/content/site";

type Tone = "reversed" | "light";
type Variant = "lockup" | "full";

const SOURCES: Record<Variant, Record<Tone, { src: string; w: number; h: number }>> = {
  /** Globe + wordmark only. The two-line descriptor is illegible below ~180px wide. */
  lockup: {
    reversed: { src: "/assets/picss-lockup-reversed.png", w: 466, h: 205 },
    light: { src: "/assets/picss-lockup.png", w: 466, h: 205 },
  },
  /** The complete logo including the institute's full name. */
  full: {
    reversed: { src: "/assets/picss-logo-reversed.png", w: 466, h: 316 },
    light: { src: "/assets/picss-logo.png", w: 466, h: 316 },
  },
};

interface WordmarkProps {
  tone?: Tone;
  variant?: Variant;
  /** Rendered height in px. Width follows the asset's aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * The official PICSS logo.
 *
 * The client supplied a JPEG on white; transparent PNGs were derived from it, including
 * an ivory-ink reversed variant for dark surfaces and a cropped lockup for the header.
 * The artwork itself is unmodified. See docs/ASSETS.md.
 */
export function Wordmark({
  tone = "reversed",
  variant = "lockup",
  height = 34,
  className,
  priority = false,
}: WordmarkProps) {
  const asset = SOURCES[variant][tone];
  const width = Math.round((height * asset.w) / asset.h);

  return (
    <Image
      src={asset.src}
      alt={`${organisation.name} logo`}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("select-none", className)}
      style={{ height, width: "auto" }}
    />
  );
}
