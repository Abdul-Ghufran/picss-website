import { internship } from "@/content/site";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { ActionButton } from "@/components/ui/Button";
import { ruleDraw } from "@/lib/motion";

/**
 * A narrow, centred inset on dark — a deliberate pause in the page rhythm between the
 * wide programs stack and the impact ledger.
 *
 * The copy is written strictly in the conditional voice used by the client reference:
 * nothing here states that an intake is open.
 */
export function InternshipSection() {
  return (
    <section id="internship" className="relative overflow-hidden bg-ink-800 section-pad-tight">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[color:var(--rule-on-dark)]"
      />

      <div className="picss-container-narrow relative">
        <Reveal className="flex items-center justify-center gap-4">
          <span className="numeral text-[0.7rem] font-medium text-picss-red">{internship.index}</span>
          <span className="eyebrow text-on-dark-muted">{internship.eyebrow}</span>
        </Reveal>

        <Reveal className="mx-auto mt-6 h-px w-24 origin-center bg-[color:var(--rule-on-dark-strong)]" variants={ruleDraw}>
          {null}
        </Reveal>

        <MaskReveal className="mt-8 text-center">
          <h2 className="display mx-auto max-w-[16ch] text-[length:var(--step-4)] text-on-dark">
            {internship.headline}
          </h2>
        </MaskReveal>

        <Reveal>
          <p className="mx-auto mt-7 max-w-[62ch] text-center text-[length:var(--step-0)] leading-[1.75] text-on-dark-muted">
            {internship.lead}
          </p>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h3 className="eyebrow text-picss-sky-dim">{internship.proposedLabel}</h3>
          </Reveal>

          <Stagger as="ol" className="mt-7 grid gap-x-10 gap-y-px sm:grid-cols-2">
            {internship.proposed.map((item, i) => (
              <StaggerItem
                key={item}
                as="li"
                className="flex gap-5 border-t border-[color:var(--rule-on-dark)] py-5 text-[length:var(--step--1)] leading-relaxed text-on-dark"
              >
                <span className="numeral shrink-0 pt-0.5 text-[0.7rem] text-on-dark-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-12">
          <PendingNotice label={internship.notice.label} tone="dark">
            {internship.notice.text}
          </PendingNotice>
        </Reveal>

        <Reveal className="mt-10 flex justify-start">
          <ActionButton action={internship.action} tone="dark" variant="secondary" />
        </Reveal>
      </div>
    </section>
  );
}
