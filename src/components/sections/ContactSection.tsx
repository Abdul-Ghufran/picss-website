import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { contact, organisation } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { EnquiryForm } from "./EnquiryForm";
import { fadeRight } from "@/lib/motion";

const details = [
  { icon: MapPin, label: "Location", value: organisation.city, href: null },
  { icon: Phone, label: "Telephone", value: organisation.phone, href: organisation.phoneHref },
  { icon: Mail, label: "Email", value: organisation.email, href: organisation.emailHref },
  { icon: Globe, label: "Website", value: organisation.website, href: organisation.website },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-800 section-pad">
      <div
        aria-hidden
        className="grid-texture pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_20%_30%,black,transparent)]"
      />

      <div className="picss-container relative">
        <div className="picss-grid">
          {/* Details */}
          <div className="col-span-12 lg:col-span-5">
            <SectionHeading
              index={contact.index}
              eyebrow={contact.eyebrow}
              headline={contact.headline}
              tone="dark"
              align="wide"
            />

            <Reveal>
              <p className="measure mt-8 text-[length:var(--step-0)] leading-[1.75] text-on-dark-muted">
                {contact.lead}
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <p className="text-[length:var(--step-0)] leading-snug font-medium text-on-dark">
                {organisation.name}
              </p>
              <p className="eyebrow mt-2 text-picss-red">{organisation.shortName}</p>
            </Reveal>

            <Stagger
              as="ul"
              className="mt-10 divide-y divide-[color:var(--rule-on-dark)] border-y border-[color:var(--rule-on-dark)]"
            >
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <StaggerItem key={detail.label} as="li" variants={fadeRight}>
                    <div className="flex items-center gap-5 py-5">
                      <Icon aria-hidden className="size-4 shrink-0 text-picss-sky-dim" />
                      <div className="min-w-0 flex-1">
                        <p className="eyebrow text-[0.62rem] text-on-dark-muted">{detail.label}</p>
                        <p className="mt-1.5 truncate text-[length:var(--step-0)] text-on-dark">
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="focus-ring link-underline"
                              {...(detail.href.startsWith("http")
                                ? { target: "_blank", rel: "noreferrer" }
                                : {})}
                            >
                              {detail.value}
                            </a>
                          ) : (
                            detail.value
                          )}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* Form */}
          <div className="col-span-12 mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <Reveal>
              <div className="border border-[color:var(--rule-on-dark)] bg-ink-900/60 p-7 sm:p-10">
                <h3 className="display text-[length:var(--step-2)] text-on-dark">
                  Send an enquiry
                </h3>
                <p className="mt-4 text-[length:var(--step--1)] leading-relaxed text-on-dark-muted">
                  Fields marked <span className="text-picss-red">*</span> are required.
                </p>

                <div className="mt-9">
                  <EnquiryForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
