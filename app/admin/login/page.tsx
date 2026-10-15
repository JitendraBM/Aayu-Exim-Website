import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { NotConfigured } from "@/components/admin/NotConfigured";
import { Section } from "@/components/ui/Section";
import { isAdminEnabled, verifyAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

/** Session-dependent — see the note in ../page.tsx. */
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (!isAdminEnabled()) return <NotConfigured />;
  if (await verifyAdmin()) redirect("/admin");

  return (
    <Section tone="paper" as="h1" eyebrow="Admin" title="Sign in">
      <LoginForm />
    </Section>
  );
}
