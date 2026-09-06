import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { categories, getCategory, getProductsByCategory } from "@/content/export";
import { chemicalsComplianceNote } from "@/content/export/chemicals";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/export/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.name, description: category.metaDescription };
}

export default async function CategoryPage({ params }: PageProps<"/export/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <Hero eyebrow="Export Directory" title={category.name} lede={category.summary} />
      <Breadcrumbs
        trail={[{ label: "Export Directory", href: "/export" }, { label: category.name }]}
      />

      <Section
        tone="paper"
        eyebrow={`${products.length} products`}
        title="Products in this category"
      >
        <CardGrid
          cards={products.map((product) => ({
            title: product.name,
            description: product.summary,
            href: `/export/${category.slug}/${product.slug}`,
          }))}
          columns={2}
        />
      </Section>

      {category.slug === "chemicals" && (
        <Section tone="tint" eyebrow="Compliance" title="Documentation and classification">
          <p className="text-brand-muted max-w-3xl leading-relaxed">{chemicalsComplianceNote}</p>
        </Section>
      )}

      <CTA
        title={`Enquire about ${category.name.toLowerCase()}`}
        body="Send the product, grade, quantity and destination port. We will confirm availability, packing and pricing."
      />
    </>
  );
}
