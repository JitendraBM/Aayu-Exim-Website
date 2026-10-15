# Aayu Exim Website

The new aayuexim.com — replacing the WordPress install currently on the domain, which is running an
unconfigured Bizmaster/Elementor theme demo with placeholder content.

**Design direction:** the `brand` theme from the design picker — the official Aayu Tiles/Exim logo
palette (teal, black and white) with the `standard` layout.

> ⚠️ **Not ready to publish.** The structure is complete; the business content is not. See
> [PLACEHOLDERS.md](./PLACEHOLDERS.md) and run `npm run check:placeholders`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (type-checks and prerenders all pages) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier, including Tailwind class ordering |
| `npm run check:placeholders` | Pre-launch gate — lists remaining `TODO:`s, fails on old demo data |

## Stack

Next.js 16 (App Router, React 19) · TypeScript · Tailwind CSS v4 · deployed to Vercel.

Everything is statically prerendered except `/api/contact`.

## How content works

There is no CMS. All copy lives as typed data in `content/`, and the pages render it. To change what
the site says, edit a file in `content/` — you do not need to touch the pages.

```
content/
  _types.ts                     shared interfaces — start here
  site.ts                       company name, tagline, nav, contact details
  pillars.ts                    the three business pillars + group stats (home page)
  ceramic-tiles.ts              capability stats, manufacturing copy, tile ranges
  industrial.ts                 the three division landing pages
  export/
    categories.ts               export categories
    agricultural.ts             ┐
    chemicals.ts                ├ product lists, one file per category
    consumer-plastics-clocks.ts ┘
    index.ts                    lookup helpers used by the pages and sitemap
```

**Unconfirmed values are written with a `TODO:` prefix.** The UI detects that prefix and renders
"To be confirmed" in muted italics instead of the raw string — so an unverified spec can never be
mistaken for a published fact, and a placeholder is visually obvious in review.

### Editing company details without a deploy

The company identity and contact block — legal name, tagline, description, address, phones,
emails, WhatsApp number, office hours — can also be edited from a password-protected screen at
**`/admin`**, so a non-developer can maintain them.

`content/site.ts` stays the source of truth in the repo. The admin screen only writes an
*override* document layered on top of it, so clearing a field restores the committed default (a
`TODO:` placeholder, rendered as "To be confirmed"). Nothing else on the site is editable this
way — nav, canonical URL and all page copy remain code.

Saving calls `revalidateTag` on the cached lookup in `lib/company.ts`, which regenerates the
affected static pages on demand. Edits appear on the public site within seconds; no redeploy.

**Environment variables** (see [.env.example](./.env.example)):

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | The shared password for `/admin`. |
| `ADMIN_SESSION_SECRET` | 32+ random chars signing the session cookie (`openssl rand -base64 32`). |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Vercel KV (Upstash) — set automatically by the dashboard integration. |

Admin fails closed: without **both** `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`, `/admin`
refuses to open rather than opening unprotected.

Vercel's filesystem is read-only at runtime, so **production needs the KV store** — that is where
edits are kept. Locally, leave the KV variables blank and edits fall back to the gitignored file
`data/company-overrides.json`; the admin screen says so with a "Local mode" banner.

> `npm run check:placeholders` only inspects the committed files in `content/`. It does not see
> admin overrides, so it still reports a field as outstanding even once someone has filled it in
> at `/admin`.

### Adding content

- **A tile range** — add an entry to `tileRanges` in `content/ceramic-tiles.ts`. The page at
  `/ceramic-tiles/<slug>` appears on the next build.
- **An export product** — add it to the relevant file in `content/export/`.
- **An export category** — create `content/export/<name>.ts`, then register it in both
  `content/export/categories.ts` and the `productsByCategory` map in `content/export/index.ts`.

Routes, `generateStaticParams` and `sitemap.xml` all derive from this data automatically.

## Site structure

```
/                                    Home
/ceramic-tiles                       Hub — capability stats, ranges
/ceramic-tiles/[range]               Range detail with ISO 10545 specs
/industrial                          Industrial & Turnkey overview
/industrial/[division]               factory-construction | installation
/export                              Commodity Export Directory
/export/[category]                   Category listing
/export/[category]/[product]         Product detail — grades, packing, HS code, MOQ
/about                               Company
/contact                             Enquiry form + contact details
```

## Brand system

Palette tokens are declared in an `@theme` block in `app/globals.css` (Tailwind v4 is CSS-first —
there is no `tailwind.config.ts`), which generates utilities like `bg-brand-teal` and
`text-brand-ink`. Contrast ratios are documented in that file; re-check them if you change a colour.

The site deliberately commits to the light brand palette and does not follow the viewer's dark-mode
preference, so the logo colours stay accurate.

UI primitives live in `components/ui/` — `Section` (background bands), `Hero`, `CardGrid`,
`StatBand`, `SpecTable`, `CTA`, `Button`. Compose pages from these rather than adding one-off
layout markup.

## Deployment

Vercel, connected to the `Aayu-Exim-Website` repository. Do not point the domain at this site until
the pre-cutover checklist in [PLACEHOLDERS.md](./PLACEHOLDERS.md) is complete.
