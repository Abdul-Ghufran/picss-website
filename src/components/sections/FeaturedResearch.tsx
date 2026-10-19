import { publications } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PublicationCard } from "./PublicationCard";
import { ActionButton } from "@/components/ui/Button";

export function FeaturedResearch() {
  const [lead, ...rest] = publications.items;

  return (
    <section id="publications" className="relative bg-paper text-on-light section-pad">
      <div className="picss-container">
        <div className="picss-grid items-end">
          <SectionHeading
            index={publications.index}
            eyebrow={publications.eyebrow}
            headline={publications.headline}
            tone="light"
            align="wide"
            className="col-span-12 lg:col-span-6"
          />

          <Reveal className="col-span-12 mt-8 space-y-5 lg:col-span-5 lg:col-start-8 lg:mt-0">
            {publications.lead.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="measure text-[length:var(--step--1)] leading-[1.75] text-on-light-muted"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Lead publication, given the full width it deserves */}
        <Reveal className="mt-16 flex items-center gap-5 lg:mt-24">
          <span className="eyebrow text-on-light-muted">{publications.featuredLabel}</span>
          <span aria-hidden className="h-px flex-1 bg-[color:var(--rule-on-light)]" />
        </Reveal>

        <div className="mt-10">
          <PublicationCard publication={lead} featured />
        </div>

        {/* The remaining record, as an even three-up */}
        <div className="mt-20 grid gap-x-8 gap-y-14 border-t border-[color:var(--rule-on-light)] pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-start gap-x-5 gap-y-6 border-t border-[color:var(--rule-on-light)] pt-10">
          {publications.actions.map((action, i) => (
            <ActionButton
              key={action.label}
              action={action}
              tone="light"
              variant={i === 0 ? "primary" : "secondary"}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
