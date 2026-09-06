import type { Product } from "../_types";

/**
 * Agricultural commodities.
 * Product names reflect the categories Aayu Exim trades in; every grade,
 * packing, HS code and MOQ value below is a `TODO:` until the trade desk
 * confirms it. Do not publish an HS code you have not verified.
 */
export const agriculturalProducts: Product[] = [
  {
    slug: "basmati-rice",
    name: "Basmati Rice",
    categorySlug: "agricultural",
    summary:
      "Long-grain aromatic rice from northern Indian growing regions, milled and sorted to buyer-specified grade.",
    grades: ["TODO: confirm grades offered (e.g. 1121 Steam, Sella, Golden Sella)"],
    packaging: ["TODO: confirm bag sizes and material", "TODO: confirm container loadability"],
    hsCode: "TODO: verify HS code",
    moq: "TODO: confirm minimum order quantity",
    specs: [
      { label: "Average grain length", value: "TODO: confirm (mm)" },
      { label: "Moisture", value: "TODO: confirm (%)" },
      { label: "Broken grains", value: "TODO: confirm (% max)" },
      { label: "Purity", value: "TODO: confirm (%)" },
    ],
  },
  {
    slug: "non-basmati-rice",
    name: "Non-Basmati Rice",
    categorySlug: "agricultural",
    summary:
      "Medium and short-grain white and parboiled rice for volume buyers and institutional supply.",
    grades: ["TODO: confirm grades offered (e.g. IR64, Sona Masoori, parboiled)"],
    packaging: ["TODO: confirm bag sizes and material"],
    hsCode: "TODO: verify HS code",
    moq: "TODO: confirm minimum order quantity",
  },
  {
    slug: "wheat",
    name: "Wheat",
    categorySlug: "agricultural",
    summary: "Milling and feed-grade wheat, cleaned and graded before shipment.",
    grades: ["TODO: confirm grades offered"],
    packaging: ["TODO: confirm bag sizes / bulk options"],
    hsCode: "TODO: verify HS code",
    moq: "TODO: confirm minimum order quantity",
  },
  {
    slug: "pulses-and-lentils",
    name: "Pulses & Lentils",
    categorySlug: "agricultural",
    summary:
      "Chickpeas, pigeon peas, mung beans, lentils and related pulses, machine-cleaned and sortex-graded.",
    grades: ["TODO: confirm varieties and grades offered"],
    packaging: ["TODO: confirm bag sizes and material"],
    hsCode: "TODO: verify HS codes (these vary per pulse)",
    moq: "TODO: confirm minimum order quantity",
  },
  {
    slug: "spices",
    name: "Spices",
    categorySlug: "agricultural",
    summary:
      "Whole and ground spices — turmeric, chilli, cumin, coriander and blends — supplied to food-grade specification.",
    grades: ["TODO: confirm spice list, whole vs ground, and quality grades"],
    packaging: ["TODO: confirm bag/carton sizes"],
    hsCode: "TODO: verify HS codes (these vary per spice)",
    moq: "TODO: confirm minimum order quantity",
    specs: [
      { label: "Moisture", value: "TODO: confirm (%)" },
      { label: "Total ash", value: "TODO: confirm (%)" },
      { label: "Aflatoxin", value: "TODO: confirm limit and test method" },
    ],
  },
  {
    slug: "oilseeds",
    name: "Oilseeds",
    categorySlug: "agricultural",
    summary: "Sesame, groundnut, mustard and other oilseeds for crushing and food use.",
    grades: ["TODO: confirm varieties and grades offered"],
    packaging: ["TODO: confirm bag sizes and material"],
    hsCode: "TODO: verify HS codes",
    moq: "TODO: confirm minimum order quantity",
  },
];
