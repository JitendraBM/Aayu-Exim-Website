# Placeholders — what must be filled before launch

The site is fully built, but the **business content is not real yet**. Every unconfirmed value is
written as a `TODO:` string in `content/`, and the site renders those as an explicit
"To be confirmed" rather than as a fact.

Run the gate at any time:

```bash
npm run check:placeholders
```

It lists every remaining `TODO:` and **fails the build if any of the old WordPress demo data**
(the invented overseas address, the foreign phone numbers, Lorem Ipsum) has crept in.
**Do not go live while this command exits non-zero.**

---

## Priority 1 — blocking. The site is misleading without these.

| What | File | Notes |
| --- | --- | --- |
| Office address | `content/site.ts` → `contact.addressLines` | Real registered/operating address. |
| Phone number(s) | `content/site.ts` → `contact.phones` | With `+91` country code. |
| Email address(es) | `content/site.ts` → `contact.emails` | A monitored inbox. |
| Office hours | `content/site.ts` → `contact.officeHours` | Include the timezone (IST). |
| Legal entity name | `content/site.ts` → `site.legalName` | As registered. |
| **Enquiry form delivery** | `app/api/contact/route.ts` | **The form currently goes nowhere.** Wire an email provider or CRM webhook. See below. |
| Logo file | `public/brand/` + `components/layout/Header.tsx` | Header currently renders the name as text. |

## Priority 2 — credibility. Buyers check these.

| What | File | Notes |
| --- | --- | --- |
| Certifications | `content/ceramic-tiles.ts` → `certifications` | **Publish only what is actually held.** ISO 9001, CE, BIS etc. |
| Statutory registrations | `app/about/page.tsx` | IEC, GST, APEDA / Spices Board. Same rule. |
| Company story | `app/about/page.tsx` | Founding year, founders, how the divisions came about. |
| Group statistics | `content/pillars.ts` → `groupStats` | Export destinations, years in operation. |
| Tile production capacity | `content/ceramic-tiles.ts` → `manufacturingStats` | Combined daily capacity, kiln lines, monthly containers. |
| Industrial track record | `content/industrial.ts` → `industrialStats` | Projects delivered, built-up area, team size. |

## Priority 3 — product detail. Fill as data becomes available.

| What | File |
| --- | --- |
| Tile sizes, finishes, ISO 10545 specs | `content/ceramic-tiles.ts` → `tileRanges[].specs` |
| Tile QC process and export packing copy | `content/ceramic-tiles.ts` → `manufacturingBlocks` |
| Statutory approvals support copy | `content/industrial.ts` → factory-construction |
| Client reporting cadence | `content/industrial.ts` → project-management |
| Installation crew capacity, panel brands, electrical licence | `content/industrial.ts` → installation |
| Agricultural grades, packing, HS codes, MOQ | `content/export/agricultural.ts` |
| Chemical grades, packing, HS codes, SDS/REACH status | `content/export/chemicals.ts` |
| Consumer plastics & clocks specs, cartons, OEM options | `content/export/consumer-plastics-clocks.ts` |

> **HS codes:** never publish one that has not been verified against the current tariff schedule.
> A wrong HS code on a public listing is a customs problem for the buyer, not a typo.

---

## Decisions deliberately deferred

- **The four tile manufacturing units are referenced as capability only.** Per the business, their
  individual brand names are not published. `content/ceramic-tiles.ts` and `content/pillars.ts` say
  "four wholly-owned manufacturing units" and nothing more. Do not add unit names, logos or links
  without explicit sign-off.
- **No CMS.** Content lives in typed files under `content/`. The shapes in `content/_types.ts` were
  designed to map cleanly onto a headless CMS later if editing by hand becomes a burden.

---

## Wiring up the enquiry form

`app/api/contact/route.ts` validates the submission, drops bot traffic via a honeypot, then logs it
and returns success. **Nobody receives it.** To finish it:

1. Pick a provider (Resend, SendGrid, AWS SES) or a CRM webhook.
2. Add the API key as an environment variable — in `.env.local` for development and in the Vercel
   project settings for production. Never commit it.
3. Replace the `console.info` call with the send, and return a 500 if the send fails so the form
   surfaces a real error to the user instead of a false success.

---

## Before DNS cutover from WordPress

- [ ] `npm run check:placeholders` exits 0.
- [ ] Enquiry form tested end to end — a real message arrives in a real inbox.
- [ ] Real contact details verified by someone at the company, not inferred.
- [ ] `site.url` in `content/site.ts` matches the final production domain.
- [ ] Open Graph image added (`app/opengraph-image.png` or similar).
- [ ] Redirects mapped for any old WordPress URLs worth preserving.
- [ ] Google Search Console updated and `sitemap.xml` submitted.
