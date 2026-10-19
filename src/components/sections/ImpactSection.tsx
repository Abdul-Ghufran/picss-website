import { impact } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { ActionButton } from "@/components/ui/Button";

/**
 * A record ledger, not a stats band.
 *
 * Deliberately contains NO numbers. The obvious design for this section would be a row of
 * big counters ("500+ citations"), but PICSS has supplied no impact figures and inventing
 * them would be a fabricated institutional claim. Each category instead declares what it
 * will hold, and shows an honest awaiting-records state.
 */
export function ImpactSection() {
  return (
    <section id="impact" className="relative bg-paper text-on-light section-pad">
      <div className="picss-container">
        <div className="picss-grid items-end">
          <SectionHeading
            index={impact.index}
            eyebrow={impact.eyebrow}
            headline={impact.headline}
            tone="light"
            align="wide"
            className="col-span-12 lg:col-span-6"
          />

          <Reveal className="col-span-12 mt-8 space-y-5 lg:col-span-5 lg:col-start-8 lg:mt-0">
            {impact.lead.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="measure text-[length:var(--step--1)] leading-[1.75] text-on-light-muted"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="mt-16 grid border-t border-[color:var(--rule-on-light)] sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
          stagger={0.08}
        >
          {impact.items.map((item, i) => (
            <StaggerItem
              key={item.id}
              as="li"
              className="group flex flex-col border-b border-[color:var(--rule-on-light)] px-0 py-9 sm:px-7 sm:[&:nth-child(odd)]:pl-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span className="numeral text-[0.68rem] text-on-light-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-5 text-[length:var(--step-1)] leading-snug font-medium tracking-[-0.015em] text-on-light">
                {item.title}
              </h3>

              <p className="mt-4 flex-1 text-[length:var(--step--1)] leading-[1.7] text-on-light-muted">
                {item.description}
              </p>

              <p className="mt-7 inline-flex items-center gap-2.5 text-[0.7rem] tracking-[0.1em] text-on-light-muted uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-picss-red/70" />
                Awaiting verified records
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12">
          <PendingNotice label="Evidence standard" tone="light">
            {impact.evidenceNote}
          </PendingNotice>
        </Reveal>

        <Reveal className="mt-10">
          <ActionButton action={impact.action} tone="light" variant="secondary" />
        </Reveal>
      </div>
    </section>
  );
}
