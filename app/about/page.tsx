import type { Metadata } from "next";
import { PlainList } from "@/components/ui/ContentBlocks";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { foundingStory, registrations } from "@/content/about";
import { certifications } from "@/content/ceramic-tiles";
import { groupStats, pillars } from "@/content/pillars";
import { site } from "@/content/site";
import { display, isPending } from "@/lib/placeholder";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Aayu Exim is an Indian export house spanning ceramic tile manufacturing, industrial turnkey projects and commodity export.",
};

export default function AboutPage() {
  return (
    <>
      <Hero eyebrow="Company" title="About Aayu Exim" lede={site.description} />

      <Section
        tone="paper"
        eyebrow="Who we are"
        title="An export house built on its own manufacturing"
        lede="Aayu Exim began in ceramic tiles and grew outward. Owning production taught us what buyers abroad actually need from a supplier — predictable quality, honest lead times, and paperwork that clears customs first time. We applied that to industrial project delivery and then to a wider commodity portfolio."
      >
        <p
          className={`text-brand-muted max-w-3xl text-sm leading-relaxed ${
            isPending(foundingStory) ? "italic" : ""
          }`}
        >
          {display(foundingStory, "Company history to be confirmed.")}
        </p>
      </Section>

      <Section tone="tint" eyebrow="At a glance" title="The group today">
        <StatBand stats={groupStats} />
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.slug}>
              <p className="text-brand-teal text-xs font-semibold tracking-[0.16em] uppercase">
                {pillar.eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{pillar.title}</h3>
              <p className="text-brand-muted mt-3 text-sm leading-relaxed">{pillar.summary}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="paper"
        eyebrow="Infrastructure"
        title="Manufacturing and delivery capability"
        lede="Four wholly-owned ceramic tile manufacturing units, in-house installation crews across four finishing trades, and a trade desk handling documentation and logistics."
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-brand-teal text-xs font-semibold tracking-[0.16em] uppercase">
              Certifications
            </h3>
            <PlainList items={certifications} />
          </div>
          <div>
            <h3 className="text-brand-teal text-xs font-semibold tracking-[0.16em] uppercase">
              Registrations
            </h3>
            <PlainList items={registrations} />
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
