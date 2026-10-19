import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { organisation } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  // Variable font: weight stays fluid, and SOFT/opsz give the display face its
  // optical refinement at large sizes. `axes` cannot be combined with fixed weights.
  axes: ["SOFT", "opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-brand",
  display: "swap",
  weight: ["400", "500"],
});

/**
 * The production origin. Set NEXT_PUBLIC_SITE_URL at build time for the real deployment;
 * the PICSS domain is used as the documented default.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? organisation.website;

const description = `${organisation.shortName} is an independent, Islamabad-based, not-for-profit think tank specialising in conflict, terrorism, extremism and security dynamics in Pakistan and the wider South Asian region.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${organisation.shortName} — ${organisation.tagline}`,
    template: `%s — ${organisation.shortName}`,
  },
  description,
  applicationName: organisation.name,
  keywords: [
    "PICSS",
    "Pakistan Institute for Conflict and Security Studies",
    "conflict research",
    "security studies",
    "South Asia",
    "militancy database",
    "counterterrorism research",
    "policy analysis",
    "Islamabad think tank",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: organisation.name,
    title: `${organisation.shortName} — ${organisation.tagline}`,
    description,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${organisation.shortName} — ${organisation.tagline}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0C1226",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} no-js`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Removes the `no-js` class before paint. `globals.css` uses `.no-js` to force every
          [data-reveal] element visible, so content is never trapped behind an animation that
          cannot run.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-picss-red focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
