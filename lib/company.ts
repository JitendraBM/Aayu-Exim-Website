import "server-only";
import { unstable_cache } from "next/cache";
import { contact as contactDefaults, site as siteDefaults } from "@/content/site";
import { readOverrides } from "./company-store";

/**
 * The effective company details: `content/site.ts` with any admin edits layered
 * on top.
 *
 * `content/site.ts` stays the source of truth in the repo — the admin screen only
 * ever writes an override document, so clearing a field restores the committed
 * default (a `TODO:` placeholder, which renders as "To be confirmed") rather than
 * blanking the site.
 *
 * The read is wrapped in `unstable_cache` with a tag so every page stays
 * statically prerendered. Reading the store directly in a page would make that
 * route dynamic. `saveCompany` calls `revalidateTag(COMPANY_TAG)`, which
 * regenerates the affected pages on demand — no redeploy.
 */

export const COMPANY_TAG = "company-details";

export interface Company {
  site: {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    url: string;
    locale: string;
  };
  contact: {
    addressLines: readonly string[];
    phones: readonly string[];
    emails: readonly string[];
    whatsapp: string;
    officeHours: string;
  };
}

const value = (override: string | undefined, fallback: string): string =>
  override && override.trim() !== "" ? override : fallback;

const list = (override: string[] | undefined, fallback: readonly string[]): readonly string[] =>
  override && override.length > 0 ? override : fallback;

const load = unstable_cache(
  async (): Promise<Company> => {
    const overrides = await readOverrides();

    return {
      site: {
        ...siteDefaults,
        legalName: value(overrides.legalName, siteDefaults.legalName),
        tagline: value(overrides.tagline, siteDefaults.tagline),
        description: value(overrides.description, siteDefaults.description),
      },
      contact: {
        addressLines: list(overrides.addressLines, contactDefaults.addressLines),
        phones: list(overrides.phones, contactDefaults.phones),
        emails: list(overrides.emails, contactDefaults.emails),
        whatsapp: value(overrides.whatsapp, contactDefaults.whatsapp),
        officeHours: value(overrides.officeHours, contactDefaults.officeHours),
      },
    };
  },
  ["company-details"],
  { tags: [COMPANY_TAG] },
);

export async function getCompany(): Promise<Company> {
  return load();
}

/** The committed defaults, shown as input placeholders on the admin form. */
export const companyDefaults = { site: siteDefaults, contact: contactDefaults };
