import { ButtonLink } from "./Button";

/**
 * Closing conversion band. Every content page ends with this so there is
 * always a route to an enquiry.
 */
export function CTA({
  title = "Tell us what you need",
  body = "Send us your specification, volume and destination port. We will come back with grades, packing options and an indicative quotation.",
  primaryLabel = "Send an enquiry",
  primaryHref = "/contact",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="bg-brand-teal text-brand-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="text-brand-paper/80 mt-4 leading-relaxed">{body}</p>
        </div>
        <ButtonLink href={primaryHref} variant="onDark" className="shrink-0">
          {primaryLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
