import { capabilities } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CapabilityRow } from "./CapabilityRow";

/**
 * Deliberately an indexed editorial list, not a card grid — five items would otherwise
 * force a lopsided 3+2 row and read as a template.
 */
export function ResearchCapabilities() {
  return (
    <section id="research" className="relative overflow-hidden bg-ink-800 section-pad">
      <div
        aria-hidden
        className="grid-texture pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      <div className="picss-container relative">
        <div className="picss-grid items-end">
          <SectionHeading
            index={capabilities.index}
            eyebrow={capabilities.eyebrow}
            headline={capabilities.headline}
            tone="dark"
            align="wide"
            className="col-span-12 lg:col-span-6"
          />
          <Reveal className="col-span-12 mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <p className="measure text-[length:var(--step-0)] leading-[1.75] text-on-dark-muted">
              {capabilities.lead}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-[color:var(--rule-on-dark)] lg:mt-24">
          {capabilities.items.map((item, i) => (
            <CapabilityRow key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
