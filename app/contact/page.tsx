import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/site";
import { realOnly } from "@/lib/placeholder";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send an enquiry to Aayu Exim — ceramic tiles, industrial turnkey projects and commodity export.",
};

/**
 * Contact details render as an explicit "to be confirmed" line while they are
 * still placeholders. Publishing invented details is exactly the failure of the
 * old WordPress site, which shipped the theme's demo address and phone numbers.
 */
function ContactDetail({
  heading,
  values,
  hrefPrefix,
}: {
  heading: string;
  values: readonly string[];
  hrefPrefix?: "tel:" | "mailto:";
}) {
  const real = realOnly(values);

  return (
    <div>
      <h3 className="text-brand-teal text-xs font-semibold tracking-[0.16em] uppercase">
        {heading}
      </h3>
      {real.length === 0 ? (
        <p className="text-brand-muted mt-3 text-sm italic">To be confirmed</p>
      ) : (
        <ul className="mt-3 space-y-1 text-sm">
          {real.map((value) => (
            <li key={value}>
              {hrefPrefix ? (
                <a
                  href={`${hrefPrefix}${hrefPrefix === "tel:" ? value.replace(/[^\d+]/g, "") : value}`}
                  className="text-brand-teal-dark hover:underline"
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get in touch"
        title="Send us your requirement"
        lede="Give us the product, quantity and destination and we will come back with grades, packing and an indicative quotation."
      />

      <Section tone="paper">
        <div className="grid gap-16 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Enquiry form</h2>
            <p className="text-brand-muted mt-3 text-sm">
              Fields marked required must be completed. We reply to every enquiry.
            </p>
            <div className="mt-10">
              <EnquiryForm />
            </div>
          </div>

          <aside className="lg:border-brand-line space-y-10 lg:border-l lg:pl-12">
            <ContactDetail heading="Address" values={contact.addressLines} />
            <ContactDetail heading="Phone" values={contact.phones} hrefPrefix="tel:" />
            <ContactDetail heading="Email" values={contact.emails} hrefPrefix="mailto:" />
            <ContactDetail heading="Office hours" values={[contact.officeHours]} />
          </aside>
        </div>
      </Section>
    </>
  );
}
