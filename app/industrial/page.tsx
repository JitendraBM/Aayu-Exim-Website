import type { Metadata } from "next";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { industrialDivisions, industrialIntro, industrialStats } from "@/content/industrial";

export const metadata: Metadata = {
  title: "Industrial & Turnkey",
  description:
    "Aayu Exim's Industrial & Turnkey division — factory construction, project management, and in-house POP, ACP, electrical and tile-laying installation.",
};

export default function IndustrialPage() {
  return (
    <>
      <Hero eyebrow="Division" title="Industrial & Turnkey" lede={industrialIntro} />

      <Section
        tone="paper"
        eyebrow="Capabilities"
        title="Three services, one contract"
        lede="Clients can take the whole package or any part of it. Most take the whole package — that is the point of a turnkey division."
      >
        <CardGrid
          cards={industrialDivisions.map((division) => ({
            title: division.title,
            description: division.intro,
            href: `/industrial/${division.slug}`,
          }))}
        />
      </Section>

      <Section tone="ink" eyebrow="Track record" title="Delivery capacity">
        <StatBand stats={industrialStats} tone="ink" />
      </Section>

      <Section
        tone="tint"
        eyebrow="The difference"
        title="Trades in-house, not subcontracted"
        lede="POP, ACP, electrical and tile laying are our own crews. That removes the handover gaps where industrial fit-outs usually lose weeks — and it means one company answers for the finish."
      />

      <CTA
        title="Planning an industrial build?"
        body="Share your process layout, site details and target commissioning date. We will come back with an indicative scope, programme and budget."
      />
    </>
  );
}
