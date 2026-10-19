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

## Deploying

The project is a standard Next.js 16 App Router app and deploys as-is to Vercel (zero
config) or any Node host via `npm run build && npm start`. One dynamic route
(`/api/enquiry`) means a static export is not possible without dropping the form.

Pre-launch checklist:

1. `NEXT_PUBLIC_SITE_URL` set to the real origin.
2. `PICSS_ENQUIRY_WEBHOOK` set, and a test enquiry actually received.
3. `docs/CONTENT-STATUS.md` walked through with PICSS; confirmed destinations filled into
   `src/content/site.ts` (replace `href: null`).
4. An Open Graph share image added, and the share card previewed.
5. Vector logo obtained and swapped in, if available.
6. `robots.txt` and `sitemap.xml` checked against the live origin.

## Updating content

Almost all copy lives in `src/content/site.ts`, organised by section and typed. Editing a
string there updates the site; no component changes needed. Setting an action's `href` from
`null` to a URL turns the disabled control into a working link automatically.

Keep `docs/CONTENT-STATUS.md` current as items are verified — it is the client-facing record
of what is still outstanding.
