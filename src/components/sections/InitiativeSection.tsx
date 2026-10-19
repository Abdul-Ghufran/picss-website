import { programs } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ActionButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Offset feature blocks — each initiative is indented a little further than the last,
 * so the section reads as a descending editorial stack rather than a grid of equals.
 */
export function InitiativeSection() {
  return (
    <section id="programs" className="relative bg-ivory text-on-light section-pad">
      <div
        aria-hidden
        className="grid-texture-light pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_60%,transparent)]"
      />

      <div className="picss-container relative">
        <div className="picss-grid items-end">
          <SectionHeading
            index={programs.index}
            eyebrow={programs.eyebrow}
            headline={programs.headline}
            tone="light"
            align="wide"
            className="col-span-12 lg:col-span-6"
          />
          <Reveal className="col-span-12 mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <p className="measure text-[length:var(--step-0)] leading-[1.75] text-on-light-muted">
              {programs.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-px lg:mt-24">
          {programs.items.map((initiative, i) => (
            <Reveal key={initiative.id}>
              <article
                className={cn(
                  "group border-t border-[color:var(--rule-on-light)] py-10 lg:py-12",
                  i === programs.items.length - 1 && "border-b",
                )}
              >
                <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                  <div className="col-span-12 lg:col-span-4">
                    <h3 className="display text-[length:var(--step-3)] text-on-light">
                      {initiative.title}
                    </h3>
                    {initiative.meta && (
                      <p className="numeral mt-3 text-[0.7rem] tracking-[0.1em] text-picss-red-deep uppercase">
                        {initiative.meta}
                      </p>
                    )}
                  </div>

                  <p className="col-span-12 text-[length:var(--step-0)] leading-[1.75] text-on-light-muted lg:col-span-7 lg:col-start-6">
                    {initiative.description}
                  </p>
                </div>

                {initiative.id === "research-partnerships" && (
                  <Stagger
                    as="ul"
                    className="mt-8 flex flex-wrap gap-x-3 gap-y-3 lg:ml-[41.66%]"
                    stagger={0.06}
                  >
                    {programs.partners.map((partner) => (
                      <StaggerItem
                        key={partner}
                        as="li"
                        className="border border-[color:var(--rule-on-light)] px-4 py-2 text-[0.74rem] text-on-light transition-colors duration-300 hover:border-picss-red/50"
                      >
                        {partner}
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-start gap-x-5 gap-y-6">
          {programs.actions.map((action, i) => (
            <ActionButton
              key={action.label}
              action={action}
              tone="light"
              variant={i === 0 ? "secondary" : "primary"}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
