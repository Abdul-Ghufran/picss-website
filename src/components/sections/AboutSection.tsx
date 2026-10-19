import { about, organisation } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { fadeRight } from "@/lib/motion";

export function AboutSection() {
  return (
    <section id="about" className="relative bg-ivory text-on-light section-pad">
      <div className="picss-container">
        <div className="picss-grid">
          <SectionHeading
            index={about.index}
            eyebrow={about.eyebrow}
            headline={about.headline}
            tone="light"
            align="wide"
            className="col-span-12 lg:col-span-5"
          />

          <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <Stagger className="space-y-7">
              {about.body.map((paragraph) => (
                <StaggerItem
                  key={paragraph.slice(0, 40)}
                  as="p"
                  className="measure text-[length:var(--step-0)] leading-[1.75] text-on-light"
                >
                  {paragraph}
                </StaggerItem>
              ))}

              <StaggerItem as="p" className="measure text-[length:var(--step-0)] leading-[1.75] text-on-light-muted">
                {about.audienceLead}{" "}
                {about.audiences.map((audience, i) => (
                  <span key={audience}>
                    <span className="text-on-light">{audience}</span>
                    {i < about.audiences.length - 1 ? ", " : " "}
                  </span>
                ))}
                {about.audienceTail}
              </StaggerItem>
            </Stagger>
          </div>
        </div>

        {/* Mission & vision — set apart as a two-up editorial statement */}
        <div className="mt-20 border-t border-[color:var(--rule-on-light)] pt-14 lg:mt-28">
          <Stagger className="grid gap-12 md:grid-cols-2 md:gap-16" stagger={0.09}>
            {[about.mission, about.vision].map((block) => (
              <StaggerItem key={block.label} variants={fadeRight} className="relative pl-7">
                <span aria-hidden className="absolute top-1.5 left-0 h-[calc(100%-0.75rem)] w-px bg-picss-red/45" />
                <h3 className="eyebrow text-on-light-muted">{block.label}</h3>
                <p className="display mt-5 max-w-[26ch] text-[length:var(--step-2)] leading-[1.25] text-on-light">
                  {block.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Identity line */}
        <Reveal className="mt-16 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-[color:var(--rule-on-light)] pt-7">
          <span className="eyebrow text-picss-red">{organisation.shortName}</span>
          <span className="text-[length:var(--step--1)] text-on-light-muted">
            {organisation.name} · {organisation.city}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
