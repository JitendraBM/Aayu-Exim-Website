# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

The replacement site for aayuexim.com — an Indian export house with three business pillars: ceramic
tiles, industrial turnkey projects, and a commodity export directory. Next.js 16 App Router + React
19 + TypeScript + Tailwind CSS v4, deployed to Vercel. Every route is statically prerendered except
`/api/contact` and `/admin`.

**The site is structurally complete but the business content is not real.** Read `README.md` and
`PLACEHOLDERS.md` before touching content — they define the pre-launch gate and the rule that
nothing may be invented (the previous WordPress site shipped its theme's demo address and foreign
phone numbers as fact).

## Commands

```bash
npm run dev                  # dev server, http://localhost:3000
npm run build                # production build — type-checks and prerenders every page
npm run lint                 # ESLint (eslint-config-next: core-web-vitals + typescript)
npm run format               # Prettier + Tailwind class ordering; format:check to verify only
npm run check:placeholders   # pre-launch gate — see below
```

There is **no test runner or test suite** in this repo. `npm run build` (full type-check + static
render of all routes) and `npm run lint` are the verification steps; run both after changes.

`npm run check:placeholders` ([scripts/check-placeholders.mjs](scripts/check-placeholders.mjs))
scans `content/`, `app/`, `components/` and: lists every remaining `TODO:` placeholder (exit 1 if
any remain), and **hard-fails on banned strings** from the old demo site (`Las Vegas`, `+880`,
`Lorem Ipsum`, …). It only sees committed files, not `/admin` overrides. Do not ship while it exits
non-zero.

## Content-as-code architecture

There is no CMS. All site copy is typed data in [content/](content/); pages are thin renderers over
it. Start from [content/_types.ts](content/_types.ts).

- [content/site.ts](content/site.ts) — company facts, `primaryNav`, `footerNav`. `site`/`contact`
  here are the committed source of truth.
- [content/pillars.ts](content/pillars.ts), [content/ceramic-tiles.ts](content/ceramic-tiles.ts),
  [content/industrial.ts](content/industrial.ts), [content/about.ts](content/about.ts) — per-area copy.
- [content/export/](content/export/) — one file per category; [content/export/index.ts](content/export/index.ts)
  holds `productsByCategory` and the lookup/`generateStaticParams`/sitemap helpers.

Routes, `generateStaticParams`, [app/sitemap.ts](app/sitemap.ts) and [app/robots.ts](app/robots.ts)
all derive from this data. Adding content:

- **Tile range** → add to `tileRanges` in `content/ceramic-tiles.ts`.
- **Export product** → add to the relevant `content/export/<category>.ts` file.
- **Export category** → new `content/export/<name>.ts`, then register it in *both*
  `content/export/categories.ts` and the `productsByCategory` map in `content/export/index.ts`.

### The placeholder / `TODO:` system

Any value not yet confirmed by the business is written as a string with a `TODO:` prefix.
[lib/placeholder.ts](lib/placeholder.ts) is the **single** place that handles this — `isPending`,
`display` (renders "To be confirmed"), `realOnly` (filters lists), `contentKey` (keeps `TODO:`
strings out of the RSC payload). Never re-implement `value.startsWith("TODO")` in a component;
route it through these helpers so a placeholder can never render as a fact.

## Admin override layer (`/admin`)

Untracked-but-present feature: a password-gated screen at `/admin` lets a non-developer edit the
company identity + contact block only (`COMPANY_FIELDS` in
[lib/company-schema.ts](lib/company-schema.ts) is the single schema driving the form, the save
action, and the merge). Nav, canonical URL and page copy stay code.

- [lib/company.ts](lib/company.ts) — `getCompany()` merges `content/site.ts` defaults with the
  override document. Wrapped in `unstable_cache` tagged `COMPANY_TAG` so pages stay static;
  clearing a field restores the committed default. Read it in a page/layout, not the store directly.
- [lib/company-store.ts](lib/company-store.ts) — persistence. Uses Vercel KV (Upstash) when
  `KV_REST_API_URL`/`KV_REST_API_TOKEN` are set; otherwise falls back to the gitignored
  `data/company-overrides.json` (dev only — Vercel's FS is read-only at runtime). `normalise()`
  distrusts stored data and coerces it to the schema shape.
- [lib/admin-auth.ts](lib/admin-auth.ts) — one shared password, signed self-contained session
  cookie (HMAC, no server state). **Fails closed**: without *both* `ADMIN_PASSWORD` and
  `ADMIN_SESSION_SECRET`, `/admin` refuses to open.
- [app/admin/actions.ts](app/admin/actions.ts) — Server Actions re-check auth themselves (reachable
  by direct POST). `saveCompany` calls `revalidateTag(COMPANY_TAG, { expire: 0 })` — a blocking
  revalidate so the editor sees their new value immediately; edits appear on the public site within
  seconds, no redeploy.

See [.env.example](.env.example) for the full env-var set.

## Enquiry form

[app/api/contact/route.ts](app/api/contact/route.ts) validates, drops honeypot (`website` field)
traffic, then emails it via Google Workspace SMTP (nodemailer) with Reply-To set to the enquirer.
Needs `SMTP_USER` + `SMTP_PASS` (a Google App Password); without them it **fails closed** in
production (500, the form shows an error) and only logs in development. See PLACEHOLDERS.md.

## Brand system

Tailwind v4 is CSS-first — there is **no `tailwind.config.ts`**. Palette tokens live in the
`@theme` block of [app/globals.css](app/globals.css) (generating `bg-brand-teal`, `text-brand-ink`,
etc.); WCAG contrast ratios are documented there — re-check them if you change a colour. The site
deliberately commits to the light palette and ignores the viewer's dark-mode preference so the logo
colours stay accurate.

Compose pages from the primitives in [components/ui/](components/ui/) (`Section`, `Hero`,
`CardGrid`, `StatBand`, `SpecTable`, `CTA`, `Button`) rather than one-off layout markup. `Section`
is the standard full-width band + constrained column; alternate `tone="paper"` / `"tint"` down a
page.

## Conventions

- Path alias `@/*` → repo root.
- Prettier: double quotes, semicolons, trailing commas, 100-col.
- Async layouts/pages read `getCompany()` once at the top and pass values down (`Header` is a
  Client Component and cannot `await`).
