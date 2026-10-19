import { database } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { DataLattice } from "@/components/visuals/DataLattice";
import { ActionButton } from "@/components/ui/Button";
import { fadeRight } from "@/lib/motion";

export function DatabaseSection() {
  return (
    <section id="database" className="relative overflow-hidden bg-ink-900 section-pad">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-picss-sky/35 to-transparent"
      />

      <div className="picss-container relative">
        <div className="picss-grid">
          {/* Narrative column */}
          <div className="col-span-12 lg:col-span-5">
            <SectionHeading
              index={database.index}
              eyebrow={database.eyebrow}
              headline={database.headline}
              tone="dark"
              align="wide"
            />

            <Reveal className="mt-9 space-y-5">
              {database.lead.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="measure text-[length:var(--step-0)] leading-[1.75] text-on-dark-muted"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-10">
              <ActionButton action={database.action} tone="dark" />
            </Reveal>
          </div>

          {/* Visual + applications */}
          <div className="col-span-12 mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <Reveal>
              <div className="border border-[color:var(--rule-on-dark)] bg-ink-800/70 p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4 pb-6">
                  <span className="eyebrow text-on-dark-muted">Structure of the record</span>
                  <span className="numeral text-[0.65rem] text-picss-sky-dim">SCHEMATIC</span>
                </div>

                <DataLattice />

                <p className="mt-6 border-t border-[color:var(--rule-on-dark)] pt-5 text-[0.72rem] leading-relaxed text-on-dark-muted">
                  Schematic representation of how the database is organised — incidents
                  resolved across time and geography. It contains no incident data, counts or
                  locations, and is not a live dashboard.
                </p>
              </div>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <h3 className="eyebrow text-picss-sky-dim">{database.applicationsLabel}</h3>
              </Reveal>

              <Stagger as="ul" className="mt-6 divide-y divide-[color:var(--rule-on-dark)] border-y border-[color:var(--rule-on-dark)]">
                {database.applications.map((application) => (
                  <StaggerItem
                    key={application}
                    as="li"
                    variants={fadeRight}
                    className="flex gap-4 py-4 text-[length:var(--step--1)] leading-relaxed text-on-dark"
                  >
                    <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-picss-red" />
                    {application}
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal>
                <p className="measure mt-8 text-[length:var(--step--1)] leading-[1.75] text-on-dark-muted">
                  {database.closing}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
