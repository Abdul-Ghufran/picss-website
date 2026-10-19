import Link from "next/link";
import { footerColumns, organisation, researchDisclaimer } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--rule-on-dark)] bg-ink-900">
      <div className="picss-container section-pad-tight">
        <div className="picss-grid">
          {/* Identity */}
          <div className="col-span-12 lg:col-span-4">
            <Wordmark width={160} />
            <p className="measure-tight mt-7 text-[length:var(--step--1)] leading-relaxed text-on-dark-muted">
              {organisation.summary}
            </p>

            <address className="mt-7 space-y-2 text-[length:var(--step--1)] not-italic text-on-dark-muted">
              <p>{organisation.city}</p>
              <p>
                <a href={organisation.phoneHref} className="focus-ring link-underline numeral">
                  {organisation.phone}
                </a>
              </p>
              <p>
                <a href={organisation.emailHref} className="focus-ring link-underline">
                  {organisation.email}
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer"
            className="col-span-12 mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6 lg:mt-0"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="eyebrow text-picss-sky-dim">{column.title}</h2>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="focus-ring link-underline text-[length:var(--step--1)] text-on-dark-muted transition-colors duration-300 hover:text-on-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Research disclaimer — supplied verbatim by the client */}
        <div className="mt-16 border-t border-[color:var(--rule-on-dark)] pt-10">
          <h2 className="eyebrow text-on-dark-muted">Research disclaimer</h2>
          <p className="mt-4 max-w-4xl text-[0.78rem] leading-[1.75] text-on-dark-muted/85">
            {researchDisclaimer}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--rule-on-dark)] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-on-dark-muted/80">
            © {year} {organisation.name}. All rights reserved.
          </p>
          <p className="numeral text-[0.68rem] tracking-[0.14em] text-on-dark-muted/60 uppercase">
            {organisation.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
