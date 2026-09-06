import type { Category } from "../_types";

export const exportIntro =
  "Beyond tiles, Aayu Exim sources and ships a broad commodity portfolio. This directory is organised by industry so buyers can find a product, check the grades and packing we offer, and send a specific enquiry rather than a general one.";

/** Add a category here, then create the matching product file in content/export/. */
export const categories: Category[] = [
  {
    slug: "agricultural",
    name: "Agricultural",
    summary:
      "Food-grade agricultural produce sourced from Indian growing regions — grains, pulses, spices, oilseeds and fresh produce.",
    metaDescription:
      "Agricultural commodities exported by Aayu Exim — grains, pulses, spices and oilseeds with grades, packing and MOQ.",
  },
  {
    slug: "chemicals",
    name: "Chemicals",
    summary:
      "Industrial and speciality chemicals for manufacturing, water treatment, construction and processing applications.",
    metaDescription:
      "Industrial and speciality chemicals exported by Aayu Exim — grades, packing, HS codes and MOQ.",
  },
  {
    slug: "consumer-plastics-clocks",
    name: "Consumer Plastics & Clocks",
    summary:
      "Moulded household plastics and wall and table clocks, supplied in retail-ready packing for distributors and chain buyers.",
    metaDescription:
      "Consumer plastic goods and clocks exported by Aayu Exim — ranges, packing and minimum order quantities.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
