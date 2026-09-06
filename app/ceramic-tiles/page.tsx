import type { Metadata } from "next";
import { CardGrid } from "@/components/ui/CardGrid";
import { ContentBlocks, PlainList } from "@/components/ui/ContentBlocks";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import {
  ceramicTilesIntro,
  certifications,
  manufacturingBlocks,
  manufacturingStats,
  tileRanges,
} from "@/content/ceramic-tiles";

export const metadata: Metadata = {
  title: "Ceramic Tiles",
  description:
    "Ceramic tiles manufactured across four wholly-owned units and exported by Aayu Exim — glazed vitrified, double charge, wall and outdoor ranges.",
};

export default function CeramicTilesPage() {
  return (
    <>
      <Hero eyebrow="Manufacturing" title="Ceramic Tiles" lede={ceramicTilesIntro} />

      <Section tone="paper" eyebrow="Production" title="Four units, one standard">
        <StatBand stats={manufacturingStats} />
        <p className="text-brand-muted mt-8 max-w-3xl text-sm">
          Our four manufacturing units operate under their own trading names. Buyers contract with
          Aayu Exim, and we allocate production across the units to meet the specification and
          delivery date agreed.
        </p>
      </Section>

      <Section
        tone="tint"
        eyebrow="Ranges"
        title="What we produce"
        lede="Four core ranges covering floor, wall and external applications. Sizes and finishes below; full technical data on each range page."
      >
        <CardGrid
          cards={tileRanges.map((range) => ({
            title: range.name,
            description: range.summary,
            href: `/ceramic-tiles/${range.slug}`,
          }))}
          columns={2}
        />
      </Section>

      <Section tone="paper" eyebrow="How we work" title="From kiln to container">
        <ContentBlocks blocks={manufacturingBlocks} />

        <div className="border-brand-line mt-16 border-t pt-10">
          <h3 className="text-brand-teal text-xs font-semibold tracking-[0.16em] uppercase">
            Certifications
          </h3>
          <PlainList items={certifications} />
        </div>
      </Section>

      <CTA
        title="Need a tile quotation?"
        body="Send the sizes, finishes and volume you need, along with your destination port. We will confirm availability across our units and come back with pricing and packing."
      />
    </>
  );
}
