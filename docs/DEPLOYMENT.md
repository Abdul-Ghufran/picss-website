# Deployment and maintenance

## Local development

Node 24 LTS is installed at
`C:\Users\MABC\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.20.0-win-x64`.
It is not on the Git Bash PATH by default.

```bash
npm install
npm run dev        # http://localhost:3000 (falls back to 3001)
```

Checks that must pass before any deploy:

```bash
npm run lint && npm run typecheck && npm run build
```

And, with the dev server running, the motion and accessibility suite:

```bash
npm run test:motion
```

Sixteen checks in a real Chromium: every scroll reveal resolves (including on a short
viewport), the hero entrance finishes with zero layout shift, the timeline rail fills at
mobile and desktop widths, keyboard focus is visible on every control type, the mobile menu
traps focus and returns it on Escape, reduced motion leaves all content present and nothing
animating, there are no console errors or failed requests, and there is no horizontal
overflow at 375/768/1024/1440.

## Environment variables

Copy `.env.example` to `.env.local` (local) or set in the hosting platform.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recommended | Production origin for canonical URLs, Open Graph and `sitemap.xml`. Defaults to `https://picss.net`. |
| `PICSS_ENQUIRY_WEBHOOK` | optional | Destination for contact-form submissions. **Until set, the form does not deliver.** |

## Contact form

`POST /api/enquiry` validates on the server (length limits, email format, required fields)
and silently absorbs honeypot submissions. Behaviour:

| Case | Response |
|---|---|
| Validation failure | `422` with per-field errors, surfaced inline on the form |
| Honeypot filled | `200` (silently dropped) |
| Malformed JSON | `400` |
| No `PICSS_ENQUIRY_WEBHOOK` | `503` — the form tells the visitor to email `info@picss.net` |
| Webhook configured and succeeds | `200` |
| Webhook configured and fails | `502` — same direct-email fallback message |

To activate delivery, point `PICSS_ENQUIRY_WEBHOOK` at anything accepting a JSON `POST`:

```json
{ "receivedAt": "ISO-8601", "name": "...", "organisation": "... or null",
  "email": "...", "subject": "...", "message": "..." }
```

An email relay (Resend, Postmark, SendGrid), a form service (Formspree, Basin) or an
internal CRM intake all work. **The form is never presented as working when it is not** —
that is the point of the 503.

Consider adding rate limiting at the platform edge before launch; the route has none.

## Deploying to Vercel

Vercel builds Next.js with zero configuration. `vercel.json` sets the framework and pins
Vercel Functions to `bom1` (Mumbai) — the closest compute region to Pakistan, instead of the
`iad1` default in Washington. Static pages are served from Vercel's global PoPs either way;
the region only affects `/api/enquiry`.

Node is pinned through `engines.node` in `package.json` (`>=20.9.0 <25`).

### First deployment

1. Push `main` to GitHub (already done: `Abdul-Ghufran/picss-website`, private).
2. At [vercel.com/new](https://vercel.com/new), import the repository. Grant the Vercel
   GitHub app access to it — the repo is private, so it will not appear otherwise.
3. Vercel detects Next.js. Leave the build and output settings untouched.
4. **Before clicking Deploy**, add the environment variable
   `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app`.
   This is not optional detail: `NEXT_PUBLIC_*` values are inlined **at build time** and
   drive the canonical URL, Open Graph tags, `robots.txt` and `sitemap.xml`. Setting it
   afterwards does nothing until the project is rebuilt.
5. Deploy.

Leave `PICSS_ENQUIRY_WEBHOOK` unset until PICSS confirms a destination. Until it is set,
`/api/enquiry` returns 503 and the contact form tells visitors to email `info@picss.net`.

### Plan note

Vercel's fair-use guidelines count "getting paid to build or host a site" as commercial use,
which requires Pro. The Hobby (free) plan is appropriate for a client **preview**; a paid
production deployment should run on Pro, or on an account owned by PICSS.

### Custom domain

Add the domain under Project → Settings → Domains, point DNS at Vercel, then update
`NEXT_PUBLIC_SITE_URL` to the real origin and **redeploy** so the metadata is rebuilt.

### Redeploying after an env var change

Project → Deployments → the latest one → Redeploy. A restart is not enough for
`NEXT_PUBLIC_*` values.

## Updating content

Almost all copy lives in `src/content/site.ts`, organised by section and typed. Editing a
string there updates the site; no component changes needed. Setting an action's `href` from
`null` to a URL turns the disabled control into a working link automatically.

Keep `docs/CONTENT-STATUS.md` current as items are verified — it is the client-facing record
of what is still outstanding.
