import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BulletList } from "@/components/ui/ContentBlocks";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { getIndustrialDivision, industrialDivisions } from "@/content/industrial";
import { isPending } from "@/lib/placeholder";

/**
 * One file serves all three division landing pages
 * (/industrial/factory-construction, /project-management, /installation).
 * Each is prerendered at build time from content/industrial.ts.
 */
export function generateStaticParams() {
  return industrialDivisions.map((division) => ({ division: division.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industrial/[division]">): Promise<Metadata> {
  const { division: slug } = await params;
  const division = getIndustrialDivision(slug);
  if (!division) return {};
  return { title: division.title, description: division.metaDescription };
}

export default async function IndustrialDivisionPage({
  params,
}: PageProps<"/industrial/[division]">) {
  const { division: slug } = await params;
  const division = getIndustrialDivision(slug);
  if (!division) notFound();

  return (
    <>
      <Hero eyebrow="Industrial & Turnkey" title={division.title} lede={division.intro} />
      <Breadcrumbs
        trail={[
          { label: "Industrial & Turnkey", href: "/industrial" },
          { label: division.shortTitle },
        ]}
      />

      {division.stats && (
        <Section tone="tint" eyebrow="Capacity">
          <StatBand stats={division.stats} />
        </Section>
      )}

      {division.blocks.map((block, index) => (
        <Section
          key={block.title}
          tone={index % 2 === 0 ? "paper" : "tint"}
          title={block.title}
          lede={isPending(block.body) ? undefined : block.body}
        >
          {isPending(block.body) && (
            <p className="text-brand-muted max-w-3xl text-sm italic">Content to be confirmed.</p>
          )}
          {block.bullets && (
            <BulletList items={block.bullets} columns={2} className="mt-2 max-w-4xl" />
          )}
        </Section>
      ))}

      <CTA
        title={`Discuss a ${division.shortTitle.toLowerCase()} requirement`}
        body="Send us the scope, site location and timeline. We will respond with an indicative approach and next steps."
      />
    </>
  );
}
