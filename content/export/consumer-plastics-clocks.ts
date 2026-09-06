import type { Product } from "../_types";

/** Consumer plastics and clocks — retail-ready goods for distributors and chain buyers. */
export const consumerProducts: Product[] = [
  {
    slug: "household-plastics",
    name: "Household Plastic Goods",
    categorySlug: "consumer-plastics-clocks",
    summary:
      "Moulded household items — storage containers, buckets, tubs, organisers and kitchenware — in food-grade and general-purpose polymers.",
    grades: ["TODO: confirm polymer grades (e.g. food-grade PP, HDPE)"],
    packaging: ["TODO: confirm inner/master carton configuration", "TODO: confirm CBM per carton"],
    hsCode: "TODO: verify HS codes (these vary per article)",
    moq: "TODO: confirm minimum order quantity",
    specs: [
      { label: "Material", value: "TODO: confirm polymer types" },
      { label: "Colour options", value: "TODO: confirm" },
      { label: "Custom branding", value: "TODO: confirm whether OEM/private label is offered" },
    ],
  },
  {
    slug: "wall-clocks",
    name: "Wall Clocks",
    categorySlug: "consumer-plastics-clocks",
    summary:
      "Quartz wall clocks in moulded and printed housings, supplied in retail-ready packing for volume distribution.",
    grades: ["TODO: confirm movement types (e.g. sweep, step) and housing materials"],
    packaging: ["TODO: confirm retail box and master carton configuration"],
    hsCode: "TODO: verify HS code",
    moq: "TODO: confirm minimum order quantity",
    specs: [
      { label: "Diameters offered", value: "TODO: confirm (mm)" },
      { label: "Movement", value: "TODO: confirm" },
      { label: "Custom dial printing", value: "TODO: confirm whether offered" },
    ],
  },
  {
    slug: "table-and-alarm-clocks",
    name: "Table & Alarm Clocks",
    categorySlug: "consumer-plastics-clocks",
    summary: "Compact table and alarm clocks for retail and promotional supply.",
    grades: ["TODO: confirm models and movement types"],
    packaging: ["TODO: confirm retail box and master carton configuration"],
    hsCode: "TODO: verify HS code",
    moq: "TODO: confirm minimum order quantity",
  },
];
