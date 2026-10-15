"use client";

import { useActionState } from "react";
import { saveCompany, type SaveState } from "@/app/admin/actions";
import { COMPANY_FIELDS, type CompanyFieldKey } from "@/lib/company-schema";
import { isPending } from "@/lib/placeholder";

const initial: SaveState = {};

/**
 * Each input starts from the *override* value, not the merged one, so an empty
 * box unambiguously means "no override — use the committed default". The default
 * is shown as the placeholder, which for an unfilled field is the `TODO:` text
 * from content/site.ts, rendered here as an explicit hint.
 */
export function CompanyForm({
  values,
  defaults,
}: {
  values: Partial<Record<CompanyFieldKey, string>>;
  defaults: Record<CompanyFieldKey, string>;
}) {
  const [state, action, pending] = useActionState(saveCompany, initial);

  return (
    <form action={action} className="mt-10 space-y-10">
      {COMPANY_FIELDS.map((field) => {
        const fallback = defaults[field.key];
        const unset = isPending(fallback);

        return (
          <div key={field.key}>
            <label htmlFor={field.key} className="block text-sm font-medium">
              {field.label}
            </label>
            {field.help && <p className="text-brand-muted mt-1 text-xs">{field.help}</p>}

            {field.kind === "text" ? (
              <input
                id={field.key}
                name={field.key}
                type="text"
                defaultValue={values[field.key] ?? ""}
                placeholder={unset ? "Not set yet" : fallback}
                maxLength={field.maxLength}
                className="border-brand-line focus:border-brand-teal mt-3 w-full rounded-sm border px-3 py-2 text-sm outline-none"
              />
            ) : (
              <textarea
                id={field.key}
                name={field.key}
                rows={field.kind === "list" ? 4 : 3}
                defaultValue={values[field.key] ?? ""}
                placeholder={unset ? "Not set yet" : fallback}
                className="border-brand-line focus:border-brand-teal mt-3 w-full rounded-sm border px-3 py-2 text-sm outline-none"
              />
            )}

            {!unset && (
              <p className="text-brand-muted mt-2 text-xs">
                Leave blank to use the built-in default.
              </p>
            )}
          </div>
        );
      })}

      <div className="border-brand-line flex items-center gap-4 border-t pt-8">
        <button
          type="submit"
          disabled={pending}
          className="bg-brand-teal text-brand-paper rounded-sm px-5 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>

        {state.ok && (
          <p role="status" className="text-brand-teal-dark text-sm">
            Saved. The public pages will show the new details within a few seconds.
          </p>
        )}
        {state.error && (
          <p role="alert" className="text-sm text-red-700">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
