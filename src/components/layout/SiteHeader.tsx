"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navigation, organisation } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Condense the header once the hero has started to leave. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the section currently in view. */
  useEffect(() => {
    const ids = navigation.map((item) => item.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Lock the page and trap focus while the mobile panel is open. */
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || menuOpen
          ? "border-b border-[color:var(--rule-on-dark)] bg-ink-900/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="picss-container flex h-[var(--header-height)] items-center justify-between gap-6">
        <Link
          href="#top"
          className="focus-ring flex shrink-0 items-center"
          aria-label={`${organisation.shortName} — home`}
        >
          <Wordmark height={scrolled ? 30 : 36} priority className="transition-all duration-500" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "focus-ring link-underline py-2 text-[0.82rem] font-medium tracking-[0.01em] transition-colors duration-300",
                      isActive ? "text-picss-sky" : "text-on-dark-muted hover:text-on-dark",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="focus-ring hidden min-h-11 items-center rounded-[3px] bg-picss-red px-5 text-[0.82rem] font-medium text-white transition-colors duration-300 hover:bg-picss-red-deep sm:inline-flex"
          >
            Institutional Enquiries
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="focus-ring -mr-2 inline-flex size-11 items-center justify-center text-on-dark lg:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={panelRef}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: prefersReduced ? 0 : 0.32, ease: EASE }}
            className="border-t border-[color:var(--rule-on-dark)] bg-ink-900 lg:hidden"
          >
            <nav aria-label="Mobile" className="picss-container py-6">
              <ul className="divide-y divide-[color:var(--rule-on-dark)]">
                {navigation.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="focus-ring flex min-h-14 items-center gap-5 text-[length:var(--step-1)] text-on-dark"
                    >
                      <span className="numeral text-[0.7rem] text-picss-red">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                onClick={closeMenu}
                className="focus-ring mt-7 flex min-h-12 items-center justify-center rounded-[3px] bg-picss-red px-5 text-sm font-medium text-white"
              >
                Institutional Enquiries
              </Link>

              <p className="mt-6 text-[length:var(--step--1)] text-on-dark-muted">
                {organisation.city} · {organisation.phone}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
