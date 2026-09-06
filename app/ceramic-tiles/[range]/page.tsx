import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { DetailList, SpecTable } from "@/components/ui/SpecTable";
import { getTileRange, tileRanges } from "@/content/ceramic-tiles";

export function generateStaticParams() {
  return tileRanges.map((range) => ({ range: range.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ceramic-tiles/[range]">): Promise<Metadata> {
  const { range: slug } = await params;
  const range = getTileRange(slug);
  if (!range) return {};
  return { title: range.name, description: range.metaDescription };
}

export default async function TileRangePage({ params }: PageProps<"/ceramic-tiles/[range]">) {
  const { range: slug } = await params;
  const range = getTileRange(slug);
  if (!range) notFound();

  return (
    <>
      <Hero eyebrow="Ceramic Tiles" title={range.name} lede={range.summary} />
      <Breadcrumbs
        trail={[{ label: "Ceramic Tiles", href: "/ceramic-tiles" }, { label: range.name }]}
      />

      <Section tone="paper" eyebrow="Range detail" title="Sizes, finishes and applications">
        <div className="grid gap-12 sm:grid-cols-3">
          <DetailList title="Sizes" items={range.sizes} />
          <DetailList title="Finishes" items={range.finishes} />
          <DetailList title="Applications" items={range.applications} />
        </div>
      </Section>

      <Section
        tone="tint"
        eyebrow="Technical data"
        title="Specifications"
        lede="Test methods follow the ISO 10545 series. Values marked as to be confirmed are pending verification against current production batches."
      >
        <div className="border-brand-line bg-brand-paper max-w-3xl rounded-sm border px-8 py-4">
          <SpecTable rows={range.specs} caption={`Technical specifications for ${range.name}`} />
        </div>
      </Section>

      <CTA
        title={`Enquire about ${range.name}`}
        body="Tell us the sizes, finishes and quantity you need along with your destination port, and we will confirm availability and packing."
      />
    </>
  );
}
