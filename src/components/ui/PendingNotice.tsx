import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

interface PendingNoticeProps {
  label: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Marks content that is structurally ready but awaiting verified material from PICSS.
 * This exists so the site never fills a gap with invented copy — the gap is shown honestly.
 */
export function PendingNotice({ label, children, tone = "dark", className }: PendingNoticeProps) {
  const isDark = tone === "dark";

  return (
    <aside
      className={cn(
        "flex gap-4 border-l-2 border-picss-red/60 py-1 pl-5",
        isDark ? "text-on-dark-muted" : "text-on-light-muted",
        className,
      )}
    >
      <Info
        aria-hidden
        className={cn("mt-0.5 size-4 shrink-0", isDark ? "text-picss-red" : "text-picss-red-deep")}
      />
      <div className="space-y-2">
        <p className={cn("eyebrow", isDark ? "text-on-dark" : "text-on-light")}>{label}</p>
        <div className="measure text-[length:var(--step--1)] leading-relaxed">{children}</div>
      </div>
    </aside>
  );
}
