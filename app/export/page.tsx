import type { Metadata } from "next";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { categories, getProductCount } from "@/content/export";
import { exportIntro } from "@/content/export/categories";

export const metadata: Metadata = {
  title: "Commodity Export Directory",
  description:
    "Aayu Exim's commodity export directory — agricultural produce, industrial chemicals, and consumer plastics and clocks, categorised by industry.",
};

export default function ExportDirectoryPage() {
  return (
    <>
      <Hero eyebrow="Trade" title="Commodity Export Directory" lede={exportIntro} />

      <Section
        tone="paper"
        eyebrow="Browse"
        title="By industry"
        lede="Pick a category to see the products we ship, with grades, packing and minimum order quantities listed per item."
      >
        <CardGrid
          cards={categories.map((category) => ({
            eyebrow: `${getProductCount(category.slug)} products`,
            title: category.name,
            description: category.summary,
            href: `/export/${category.slug}`,
          }))}
        />
      </Section>

      <Section
        tone="tint"
        eyebrow="How enquiries work"
        title="What to send us"
        lede="A specific enquiry gets a specific quotation. The more of the following you can give us up front, the faster we can price it."
      >
        <ul className="grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            "Product and grade required",
            "Quantity, and whether it is a one-off or recurring",
            "Destination port and Incoterm (FOB, CIF, etc.)",
            "Packing preference, if you have one",
            "Any certification or inspection you need at origin",
            "Target delivery window",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm">
              <span aria-hidden className="text-brand-teal">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CTA />
    </>
  );
}
