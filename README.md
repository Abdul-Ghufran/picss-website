# PICSS — institutional website

Website for the **Pakistan Institute for Conflict and Security Studies**, an independent,
Islamabad-based, not-for-profit think tank researching conflict, terrorism, extremism and
security in Pakistan and the wider South Asian region.

> *Tracking Conflict. Analysing Security. Informing Policy.*

## Quick start

Node 24 LTS is required and is **not** on the Git Bash PATH by default:

```bash
export PATH="/c/Users/MABC/AppData/Local/Microsoft/WinGet/Packages/OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe/node-v24.20.0-win-x64:$PATH"
```

```bash
npm install
npm run dev
```

Then open http://localhost:3000 (the dev server falls back to 3001 if 3000 is taken).

| Command | Purpose |
|---|---|
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm start` | serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run test:motion` | Playwright motion & accessibility suite (start `npm run dev` first) |

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5.9 · Tailwind CSS 4
(CSS-first `@theme`) · Motion for React 14 · lucide-react.

## Documentation

| File | Contents |
|---|---|
| `CLAUDE.md` | durable project instructions, standards, commands |
| `docs/CONTENT-STATUS.md` | **what the client still needs to verify** — read before launch |
| `docs/DEPLOYMENT.md` | environment variables, contact-form integration, deploy checklist |
| `docs/ASSETS.md` | how the logo variants and icons were derived |
| `.claude/skills/` | design-system, motion and design-review skills |

## Content integrity

`client-reference/about.txt` is the sole source of truth for organisational claims, and all
copy lives typed in `src/content/site.ts`.

Nothing on this site is invented. Where the client has not supplied material — publication
URLs, impact records, internship details — the design shows an honest
awaiting-verification state rather than placeholder copy that could pass for fact. The two
data-style graphics are explicitly schematic and carry no incident data.

See `docs/CONTENT-STATUS.md` for the full register of outstanding items.

## Editing content

Change a string in `src/content/site.ts` and the site updates. Actions written as
`href: null` render as disabled, clearly-labelled controls; give one a URL and it becomes a
working link.
