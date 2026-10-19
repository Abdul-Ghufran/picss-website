import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Action } from "@/content/site";

type Tone = "light" | "dark";
type Variant = "primary" | "secondary" | "ghost";

const base =
  "focus-ring group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[3px] px-6 py-3 text-sm font-medium tracking-[0.01em] transition-colors duration-300";

const styles: Record<Variant, Record<Tone, string>> = {
  primary: {
    dark: "bg-picss-red text-white hover:bg-picss-red-deep",
    light: "bg-picss-red text-white hover:bg-picss-red-deep",
  },
  secondary: {
    dark: "border border-[color:var(--rule-on-dark-strong)] text-on-dark hover:border-picss-sky hover:text-picss-sky",
    light: "border border-[color:var(--rule-on-light-strong)] text-on-light hover:border-picss-red hover:text-picss-red",
  },
  ghost: {
    dark: "px-0 text-on-dark-muted hover:text-on-dark",
    light: "px-0 text-on-light-muted hover:text-on-light",
  },
};

interface ActionButtonProps {
  action: Action;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  withArrow?: boolean;
}

/**
 * Renders a call to action. When `action.href` is null the destination has not been
 * confirmed by the client, so we render a disabled, clearly-labelled control rather than
 * guessing a URL. See docs/CONTENT-STATUS.md.
 */
export function ActionButton({
  action,
  variant = "primary",
  tone = "dark",
  className,
  withArrow = true,
}: ActionButtonProps) {
  const classes = cn(base, styles[variant][tone], className);

  if (action.href === null) {
    return (
      <span className={cn("inline-flex flex-col gap-1.5", variant === "ghost" && "gap-1")}>
        <button
          type="button"
          disabled
          aria-describedby={`pending-${slug(action.label)}`}
          className={cn(
            base,
            tone === "dark"
              ? "border border-dashed border-[color:var(--rule-on-dark-strong)] text-on-dark-muted"
              : "border border-dashed border-[color:var(--rule-on-light-strong)] text-on-light-muted",
            "cursor-not-allowed",
            className,
          )}
        >
          <Lock aria-hidden className="size-3.5 shrink-0" />
          {action.label}
        </button>
        <span
          id={`pending-${slug(action.label)}`}
          className={cn(
            "eyebrow text-[0.65rem] tracking-[0.14em]",
            tone === "dark" ? "text-on-dark-muted" : "text-on-light-muted",
          )}
        >
          {action.pendingNote ?? "Destination to be confirmed"}
        </span>
      </span>
    );
  }

  return (
    <Link href={action.href} className={classes}>
      {action.label}
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
