"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkPassword,
  endAdminSession,
  isAdminEnabled,
  startAdminSession,
  verifyAdmin,
} from "@/lib/admin-auth";
import { COMPANY_TAG } from "@/lib/company";
import { COMPANY_FIELDS, type CompanyOverrides } from "@/lib/company-schema";
import { writeOverrides } from "@/lib/company-store";

/**
 * Server Actions are reachable by direct POST, not only through the form — so
 * each one re-checks authorisation itself rather than trusting that the page
 * that rendered the form did.
 */

export interface LoginState {
  error?: string;
}

export interface SaveState {
  ok?: boolean;
  error?: string;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminEnabled()) {
    return { error: "Admin access is not configured on this deployment." };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password)) {
    return { error: "Incorrect password." };
  }

  await startAdminSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endAdminSession();
  redirect("/admin/login");
}

/** Same shape as the enquiry endpoint's check — see app/api/contact/route.ts. */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function saveCompany(_prev: SaveState, formData: FormData): Promise<SaveState> {
  if (!(await verifyAdmin())) {
    return { error: "Your session has expired. Reload the page and sign in again." };
  }

  // Collected loosely, then cast once — the per-field type is decided by
  // `field.kind`, which TypeScript cannot follow through the loop.
  const next: Record<string, string | string[]> = {};

  for (const field of COMPANY_FIELDS) {
    const raw = formData.get(field.key);
    if (typeof raw !== "string") continue;

    if (field.kind === "list") {
      const lines = raw
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "");

      const tooLong = lines.find((line) => line.length > field.maxLength);
      if (tooLong) {
        return {
          error: `${field.label}: each line must be ${field.maxLength} characters or fewer.`,
        };
      }

      if (field.key === "emails") {
        const invalid = lines.find((line) => !isValidEmail(line));
        if (invalid) return { error: `${field.label}: “${invalid}” is not a valid email address.` };
      }

      if (lines.length > 0) next[field.key] = lines;
    } else {
      const trimmed = raw.trim();
      if (trimmed.length > field.maxLength) {
        return { error: `${field.label}: must be ${field.maxLength} characters or fewer.` };
      }
      if (trimmed !== "") next[field.key] = trimmed;
    }
  }

  try {
    await writeOverrides(next as CompanyOverrides);
  } catch (error) {
    console.error("[admin] failed to save company details", error);
    return { error: "Could not save. The storage backend rejected the write." };
  }

  // Every page that shows the company details is statically prerendered; this is
  // what makes a save appear on the public site without a redeploy.
  //
  // `{ expire: 0 }` rather than the recommended "max" profile: stale-while-
  // revalidate would show the editor their *old* address on the next page load,
  // which reads as "the save didn't work". A blocking revalidate is the right
  // trade here — this fires a handful of times a year, not per request.
  revalidateTag(COMPANY_TAG, { expire: 0 });

  return { ok: true };
}
