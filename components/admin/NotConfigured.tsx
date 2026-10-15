import { Section } from "@/components/ui/Section";

/**
 * Shown instead of the admin screens when the env vars are missing. Admin fails
 * closed: no password configured means no way in, not a way in without one.
 */
export function NotConfigured() {
  return (
    <Section
      tone="paper"
      as="h1"
      eyebrow="Admin"
      title="Admin access is not configured"
      lede="Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the environment, then reload."
    >
      <p className="text-brand-muted max-w-2xl text-sm leading-relaxed">
        On Vercel, add both under Project Settings → Environment Variables and redeploy. Locally,
        put them in <code className="text-brand-ink">.env.local</code> — see{" "}
        <code className="text-brand-ink">.env.example</code>.
      </p>
    </Section>
  );
}
