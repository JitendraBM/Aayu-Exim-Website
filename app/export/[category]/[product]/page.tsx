import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { DetailList, SpecTable } from "@/components/ui/SpecTable";
import { getAllProductPaths, getCategory, getProduct } from "@/content/export";

export function generateStaticParams() {
  return getAllProductPaths();
}

export async function generateMetadata({
  params,
}: PageProps<"/export/[category]/[product]">): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProduct(categorySlug, productSlug);
  const category = getCategory(categorySlug);
  if (!product || !category) return {};
  return {
    title: product.name,
    description: `${product.summary} Exported by Aayu Exim under ${category.name}.`,
  };
}

/** Rows shown above the spec table — only rendered when a value exists. */
function tradeRows(product: NonNullable<ReturnType<typeof getProduct>>) {
  return [
    { label: "HS code", value: product.hsCode },
    { label: "Minimum order quantity", value: product.moq },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
}

export default async function ProductPage({ params }: PageProps<"/export/[category]/[product]">) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategory(categorySlug);
  const product = getProduct(categorySlug, productSlug);
  if (!category || !product) notFound();

  return (
    <>
      <Hero eyebrow={category.name} title={product.name} lede={product.summary} />
      <Breadcrumbs
        trail={[
          { label: "Export Directory", href: "/export" },
          { label: category.name, href: `/export/${category.slug}` },
          { label: product.name },
        ]}
      />

      <Section tone="paper" eyebrow="Supply detail" title="Grades, packing and trade terms">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            {product.grades && <DetailList title="Grades & varieties" items={product.grades} />}
            {product.packaging && <DetailList title="Packing" items={product.packaging} />}
          </div>
          <div className="border-brand-line rounded-sm border px-8 py-4">
            <SpecTable rows={tradeRows(product)} caption={`Trade terms for ${product.name}`} />
          </div>
        </div>
      </Section>

      {product.specs && product.specs.length > 0 && (
        <Section
          tone="tint"
          eyebrow="Technical data"
          title="Specifications"
          lede="Values are confirmed per shipment against the agreed contract specification."
        >
          <div className="border-brand-line bg-brand-paper max-w-3xl rounded-sm border px-8 py-4">
            <SpecTable rows={product.specs} caption={`Specifications for ${product.name}`} />
          </div>
        </Section>
      )}

      <CTA
        title={`Enquire about ${product.name}`}
        body="Send us the grade, quantity, destination port and Incoterm. We will come back with packing options and an indicative quotation."
      />
    </>
  );
}
