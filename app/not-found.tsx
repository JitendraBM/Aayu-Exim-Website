import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-32 sm:px-8">
      <p className="text-brand-teal text-xs font-semibold tracking-[0.18em] uppercase">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-brand-muted mt-5 max-w-xl leading-relaxed">
        The page you asked for does not exist, or has moved. Try the export directory or send us an
        enquiry directly.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/export" variant="secondary">
          Export directory
        </ButtonLink>
      </div>
    </div>
  );
}
