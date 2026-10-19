import { cn } from "@/lib/cn";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { ruleDraw } from "@/lib/motion";

type Tone = "light" | "dark";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  headline: string;
  tone?: Tone;
  /** Render the headline as the page h1 (hero only). */
  level?: "h1" | "h2";
  className?: string;
  align?: "left" | "wide";
}

/**
 * The shared section opener: a mono numeral, a hairline that draws itself across the
 * column, the eyebrow, then the display headline rising behind a mask.
 */
export function SectionHeading({
  index,
  eyebrow,
  headline,
  tone = "dark",
  level = "h2",
  className,
  align = "left",
}: SectionHeadingProps) {
  const Tag = level;
  const muted = tone === "dark" ? "text-on-dark-muted" : "text-on-light-muted";
  const strong = tone === "dark" ? "text-on-dark" : "text-on-light";
  const rule = tone === "dark" ? "bg-[color:var(--rule-on-dark)]" : "bg-[color:var(--rule-on-light)]";

  return (
    <div className={cn(className)}>
      <Reveal className="flex items-center gap-4">
        <span
          className={cn(
            "numeral text-[0.7rem] font-medium",
            tone === "dark" ? "text-picss-red" : "text-picss-red-deep",
          )}
        >
          {index}
        </span>
        <span className={cn("eyebrow", muted)}>{eyebrow}</span>
      </Reveal>

      <Reveal className={cn("mt-5 h-px w-full origin-left", rule)} variants={ruleDraw}>
        {null}
      </Reveal>

      <MaskReveal className="mt-7">
        <Tag
          className={cn(
            "display",
            strong,
            align === "wide" ? "max-w-[22ch]" : "max-w-[18ch]",
            level === "h1" ? "text-[length:var(--step-6)]" : "text-[length:var(--step-4)]",
          )}
        >
          {headline}
        </Tag>
      </MaskReveal>
    </div>
  );
}
