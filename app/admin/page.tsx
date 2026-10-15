import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CompanyForm } from "@/components/admin/CompanyForm";
import { NotConfigured } from "@/components/admin/NotConfigured";
import { Section } from "@/components/ui/Section";
import { isAdminEnabled, verifyAdmin } from "@/lib/admin-auth";
import { companyDefaults } from "@/lib/company";
import { COMPANY_FIELDS, type CompanyFieldKey } from "@/lib/company-schema";
import { hasDurableStore, readOverrides } from "@/lib/company-store";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Company details",
  robots: { index: false, follow: false },
};

/**
 * Never prerender an authorisation-gated route. Without this, a build where
 * ADMIN_PASSWORD is unset returns the "not configured" branch before touching
 * `cookies()`, and the page is baked as static HTML — which would then be served
 * to everyone regardless of session.
 */
export const dynamic = "force-dynamic";

/** Which `content/site.ts` value backs each editable field. */
const DEFAULT_FOR: Record<CompanyFieldKey, string> = {
  legalName: companyDefaults.site.legalName,
  tagline: companyDefaults.site.tagline,
  description: companyDefaults.site.description,
  addressLines: companyDefaults.contact.addressLines.join("\n"),
  phones: companyDefaults.contact.phones.join("\n"),
  emails: companyDefaults.contact.emails.join("\n"),
  whatsapp: companyDefaults.contact.whatsapp,
  officeHours: companyDefaults.contact.officeHours,
};

export default async function AdminPage() {
  if (!isAdminEnabled()) return <NotConfigured />;
  if (!(await verifyAdmin())) redirect("/admin/login");

  const overrides = await readOverrides();

  // `list` fields edit as one value per line; flatten them for the textareas.
  const values: Partial<Record<CompanyFieldKey, string>> = {};
  for (const field of COMPANY_FIELDS) {
    const value = overrides[field.key];
    if (Array.isArray(value)) values[field.key] = value.join("\n");
    else if (typeof value === "string") values[field.key] = value;
  }

  return (
    <Section
      tone="paper"
      as="h1"
      eyebrow="Admin"
      title="Company details"
      lede="These values feed the site footer, the contact page and the page metadata. Saving publishes them within a few seconds — no redeploy needed."
    >
      {!hasDurableStore() && (
        <p className="mb-10 rounded-sm border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong className="font-semibold">Local mode.</strong> No KV store is configured, so edits
          save to <code>data/company-overrides.json</code> on this machine only. On Vercel, add the
          KV integration and set <code>KV_REST_API_URL</code> and <code>KV_REST_API_TOKEN</code>.
        </p>
      )}

      <CompanyForm values={values} defaults={DEFAULT_FOR} />

      <form action={logout} className="border-brand-line mt-16 border-t pt-8">
        <button type="submit" className="text-brand-muted hover:text-brand-ink text-sm underline">
          Sign out
        </button>
      </form>
    </Section>
  );
}
