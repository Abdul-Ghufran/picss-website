# Asset derivation

The client supplied five JPEGs in `assets/`. Nothing was redrawn; the derived files below
are crops and alpha extractions of the original artwork.

## Source files

| Source | Size | Used as |
|---|---|---|
| `picss logo.jpeg` | 554×554 | the official logo |
| `publication 1.jpeg` | 369×566 | The Role of Madrasas (Danish Defence) |
| `publication 2.jpeg` | 356×534 | Baloch Yakjehti Committee strategy paper |
| `publication 3.jpeg` | 396×560 | Pakistan's Comprehensive National Security Profile 2025 |
| `publication 4.jpeg` | 768×987 | Post-August 2021: Taliban … Afghanistan |

Publication covers are copied unchanged to `public/assets/` under descriptive names.
Because the sources are small, `PublicationCard` caps the rendered cover box (352px for the
featured card, 288px for the grid) so they are never upscaled.

## Derived logo variants

The logo JPEG is opaque white behind the mark. The white was removed by treating the image
as artwork composited over white and recovering straight alpha per pixel
(`alpha = 255 - min(r,g,b)`, then un-premultiplying the colour), followed by a bounding-box
trim. This preserves anti-aliased edges correctly.

| File | Derivation | Used in |
|---|---|---|
| `picss-logo.png` | transparent, trimmed (466×316) | light surfaces |
| `picss-logo-reversed.png` | as above, with near-black descriptor ink remapped to ivory `#F5F3EE` | dark surfaces — footer |
| `picss-lockup.png` / `picss-lockup-reversed.png` | top 66.5% crop: globe + "PiCSS" only (466×205) | header — the two-line descriptor is illegible below ~180px wide |
| `picss-mark.png` | squared, padded mark | app icon source |
| `src/app/icon.png`, `src/app/apple-icon.png` | 64px and 180px, composited on white | favicon and touch icon |

A reversed logo is standard brand practice, but PICSS should still sign it off.

## Known limitations

- Everything derives from a **raster JPEG**, so the logo carries JPEG artefacts at large
  sizes and cannot scale cleanly. **Request a vector original (SVG, AI or EPS).**
- The logo's descriptor text contains a typo ("Institue"); see `docs/CONTENT-STATUS.md`.
- No Open Graph share image has been produced.

## Colour sampling

Brand colours were sampled from the logo pixels rather than guessed:
red `#DC2A1C`, indigo `#3D2B9B` (the "C"), sky `#5CBDE0` (the world map).
