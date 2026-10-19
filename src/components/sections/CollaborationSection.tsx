import { collaboration, organisation } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ActionButton } from "@/components/ui/Button";
import { fadeRight } from "@/lib/motion";

export function CollaborationSection() {
  return (
    <section id="collaboration" className="relative bg-ivory text-on-light section-pad">
      <div className="picss-container">
        <SectionHeading
          index={collaboration.index}
          eyebrow={collaboration.eyebrow}
          headline={collaboration.headline}
          tone="light"
          align="wide"
          className="max-w-3xl"
        />

        <div className="picss-grid mt-14 lg:mt-20">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="measure text-[length:var(--step-0)] leading-[1.75] text-on-light-muted">
                {collaboration.lead}
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="eyebrow text-on-light-muted">{collaboration.areasLabel}</h3>
            </Reveal>

            <Stagger as="ul" className="mt-6 grid gap-x-10 sm:grid-cols-2" stagger={0.06}>
              {collaboration.areas.map((area, i) => (
                <StaggerItem
                  key={area}
                  as="li"
                  variants={fadeRight}
                  className="flex gap-4 border-t border-[color:var(--rule-on-light)] py-4 text-[length:var(--step--1)] leading-relaxed text-on-light"
                >
                  <span className="numeral shrink-0 pt-0.5 text-[0.68rem] text-picss-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {area}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal>
              <p className="measure mt-10 text-[length:var(--step-0)] leading-[1.75] text-on-light">
                {collaboration.closing}
              </p>
            </Reveal>
          </div>

          {/* Enquiry panel */}
          <div className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <Reveal>
              <div className="border border-[color:var(--rule-on-light-strong)] bg-paper p-8">
                <h3 className="display text-[length:var(--step-2)] text-on-light">
                  {collaboration.conversationLabel}
                </h3>

                <p className="mt-5 text-[length:var(--step--1)] leading-relaxed text-on-light-muted">
                  Institutional enquiries concerning research partnerships, collaboration and
                  opportunities for informed dialogue.
                </p>

                <dl className="mt-8 space-y-5 border-t border-[color:var(--rule-on-light)] pt-7">
                  <div>
                    <dt className="eyebrow text-on-light-muted">Email</dt>
                    <dd className="mt-2">
                      <a
                        href={organisation.emailHref}
                        className="focus-ring link-underline text-[length:var(--step-0)] font-medium text-on-light"
                      >
                        {organisation.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-on-light-muted">Telephone</dt>
                    <dd className="mt-2">
                      <a
                        href={organisation.phoneHref}
                        className="focus-ring link-underline numeral text-[length:var(--step-0)] text-on-light"
                      >
                        {organisation.phone}
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <ActionButton action={collaboration.action} tone="light" className="w-full" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
