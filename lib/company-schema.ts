/**
 * The company-detail fields the /admin screen can edit.
 *
 * These are the business facts from `content/site.ts` that a non-developer needs
 * to maintain — the registered name and the contact block. Everything else in
 * `content/site.ts` (nav, canonical URL, locale) stays a code concern.
 *
 * One schema drives three things: the form inputs, the save-action parsing, and
 * the merge in `lib/company.ts`. Keep it the single source of truth.
 */

/** Stored override document. Every field is optional; a missing or blank field
 *  means "use the default from content/site.ts". */
export interface CompanyOverrides {
  legalName?: string;
  tagline?: string;
  description?: string;
  addressLines?: string[];
  phones?: string[];
  emails?: string[];
  whatsapp?: string;
  officeHours?: string;
}

export type CompanyFieldKey = keyof CompanyOverrides;

export interface FieldDef {
  key: CompanyFieldKey;
  label: string;
  /** `text` → <input>; `textarea` → multi-line prose; `list` → one value per line. */
  kind: "text" | "textarea" | "list";
  help?: string;
  /** Max characters per value (per line for `list` fields). */
  maxLength: number;
}

export const COMPANY_FIELDS: FieldDef[] = [
  {
    key: "legalName",
    label: "Registered legal entity name",
    kind: "text",
    help: "The full name as registered — appears in the site footer and structured data.",
    maxLength: 200,
  },
  {
    key: "tagline",
    label: "Tagline",
    kind: "text",
    help: "Short line shown under the logo and in the page title.",
    maxLength: 160,
  },
  {
    key: "description",
    label: "One-line company description",
    kind: "textarea",
    help: "Used for the site meta description and the About page intro.",
    maxLength: 320,
  },
  {
    key: "addressLines",
    label: "Office address",
    kind: "list",
    help: "One line per row, e.g. street, area, then city / state / PIN. Add “India” as the last line.",
    maxLength: 120,
  },
  {
    key: "phones",
    label: "Phone number(s)",
    kind: "list",
    help: "One per line, with the +91 country code.",
    maxLength: 40,
  },
  {
    key: "emails",
    label: "Email address(es)",
    kind: "list",
    help: "One per line.",
    maxLength: 120,
  },
  {
    key: "whatsapp",
    label: "WhatsApp business number",
    kind: "text",
    help: "Optional. Leave blank if there isn’t one.",
    maxLength: 40,
  },
  {
    key: "officeHours",
    label: "Office hours",
    kind: "text",
    help: "e.g. Mon–Sat, 09:30–18:30 IST",
    maxLength: 120,
  },
];

export const LIST_FIELD_KEYS: CompanyFieldKey[] = COMPANY_FIELDS.filter(
  (field) => field.kind === "list",
).map((field) => field.key);
