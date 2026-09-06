import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { getIndustrialDivision, industrialDivisions } from "@/content/industrial";

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
          lede={block.body.startsWith("TODO") ? undefined : block.body}
        >
          {block.body.startsWith("TODO") && (
            <p className="text-brand-muted max-w-3xl text-sm italic">Content to be confirmed.</p>
          )}
          {block.bullets && (
            <ul className="mt-2 grid max-w-4xl gap-3 sm:grid-cols-2">
              {block.bullets.map((bullet) => {
                const pending = bullet.startsWith("TODO");
                return (
                  <li
                    key={bullet}
                    className={`flex gap-3 text-sm ${pending ? "text-brand-muted italic" : "text-brand-ink"}`}
                  >
                    <span aria-hidden className="text-brand-teal">
                      —
                    </span>
                    <span>{pending ? "To be confirmed" : bullet}</span>
                  </li>
                );
              })}
            </ul>
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
