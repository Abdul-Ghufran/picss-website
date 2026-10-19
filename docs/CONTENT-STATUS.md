# Content status — what is verified, and what PICSS must confirm

Every organisational claim on the site traces to `client-reference/about.txt`. This file is
the register of everything that is **not** yet verified. Nothing listed here was invented to
fill a gap; each item renders as an honest awaiting-verification state.

Review this with the client before the site goes live.

---

## 1. Destinations not yet confirmed (render as disabled, labelled controls)

These actions appear in the design with `href: null` in `src/content/site.ts`. They render
as a clearly-marked, non-navigating control with a note, rather than pointing at a guessed
URL. Supply the real destination and the control activates.

| Action | Section | Needed from PICSS |
|---|---|---|
| Explore Publications | Publications | URL of the publications index |
| Browse Research & Analysis | Publications | URL of the research/analysis archive |
| Explore the PICSS Militancy Database | Militancy Database | Database destination (public page, request form, or login) |
| Explore Programs | Programs | URL of the programs page |
| Internship Information | Internship | Confirm whether to publish at all, then the destination |
| Explore Impact & Recognition | Impact | URL, once records exist |
| Per-publication "Read the publication" | Publications | A working URL for each of the four items |

## 2. Publications — covers verified, metadata partly missing

The four cover images were supplied by the client and are used as-is. Their titles were read
from the artwork. What is missing:

| Publication | Have | Missing |
|---|---|---|
| Pakistan's Comprehensive National Security Profile 2025 | Cover, title, year 2025, "Annual Report · Islamabad" | Exact publication date, URL, authors |
| PICSS–RDDC Research on Afghanistan *(cover reads: Post-August 2021: Taliban Governance, Security Dynamics and the Road to Stability in Afghanistan; Gul Dad, Abdullah Khan, Jens V. Mathiesen)* | Cover, title, authors, RDDC attribution | Publication date, URL, ISBN |
| Security & Strategic Assessments *(cover shown: Baloch Yakjehti Committee (BYC): Structure, Influence, and State Response — A Comprehensive Profile, Strategy Paper)* | Cover, title | Publication date, URL. **Confirm** this strategy paper is the right representative cover for the series |
| Research Articles & Policy Analysis *(cover shown: The Role of Madrasas, ed. David Vestenskov, Danish Defence)* | Cover, title, editor | Publication date, URL. **Confirm** PICSS's role in this title and that it is appropriate to show here |

> The last two covers are specific publications standing in for broad categories. PICSS
> should confirm that pairing, or supply category-level artwork instead.

## 3. Sections with no verified content yet

**Institutional Impact & Recognition** — the source describes four categories but supplies no
records. The section renders the four categories with an "Awaiting verified records" state
and contains **no numbers**. Deliberately so: a row of impact counters is the obvious design,
but PICSS has supplied no figures and inventing them would be a fabricated claim.
Needed: for each item, the publication or institution, date, context and original source.

**Internship & Early-Career Engagement** — the source is explicitly conditional ("could
explain", "the proposed section can feature"). The copy preserves that voice and the page
states that no particular intake is implied. Before publishing: availability, eligibility,
duration, selection criteria, deadlines, and whether to publish the section at all.

## 4. Conceptual graphics — illustrative, not data

| Graphic | What it is | Safeguards |
|---|---|---|
| Hero regional visualisation | Abstract graticule, contour rings and an analytical node network | No national borders, no place names, no incident data. Captioned "Illustrative research graphic — not a live incident map and not derived from incident data." The focal node is a neutral sky ring, **not** a red pin, so it cannot read as an incident marker |
| Militancy Database lattice | Schematic of how the record is *organised* — axes labelled TIME and DISTRICT only | Fixed hand-authored pattern, no values, counts, dates or locations. Captioned as containing no incident data and not being a live dashboard |

**Borders are deliberately omitted.** Depicting this region's boundaries is a factual and
political claim the client has not supplied. If PICSS wants a real map, they must supply or
approve the geographic source.

## 5. Brand assets

- The supplied logo is a **JPEG on a white background** (`assets/picss logo.jpeg`, 554×554).
  Transparent PNGs were derived from it — a reversed ivory-ink variant for dark surfaces, and
  a cropped globe+wordmark lockup for the header. The artwork itself is unmodified.
  See `docs/ASSETS.md`. **A vector (SVG/AI/EPS) original would materially improve quality.**
- **The logo contains a typo:** the descriptor reads "Pakistan Institue for Conflict and
  Security Studies" — *Institue* is missing a **t**. This has been left exactly as supplied.
  PICSS should confirm whether to correct the artwork; the site's own text uses the correct
  spelling throughout.
- No official brand guidelines were supplied. The palette was sampled from the logo
  (red `#DC2A1C`, indigo `#3D2B9B`, sky `#5CBDE0`). **Confirm against official brand colours
  if any exist.**
- Typography (Fraunces / Inter / JetBrains Mono) is a design choice, not a client standard.

## 6. Other items to confirm

- **"Established 2014"** in the hero derives from the timeline entry "2014 — Institutional
  Launch". Confirm the phrasing is acceptable.
- **Contact form delivery** is not configured. The endpoint validates properly and returns a
  clear 503 directing visitors to `info@picss.net` until `PICSS_ENQUIRY_WEBHOOK` is set.
  See `docs/DEPLOYMENT.md`. It is not a decorative form, and it does not silently drop mail.
- **No social media accounts** were supplied, so the footer has no social links.
- **No postal address** beyond "Islamabad, Pakistan" was supplied.
- **No staff, leadership or trustee information** was supplied; there is no team section.
- **Canonical URL / Open Graph** default to `https://picss.net`. Set `NEXT_PUBLIC_SITE_URL`
  for the real deployment origin.
- **No Open Graph share image** has been designed yet; the metadata declares the card type
  but no bespoke image exists.
- **No structured data (JSON-LD)** was added, deliberately — it would require asserting
  organisational facts (founding date, address, identifiers) that are not fully verified.
