import type { Product } from "../_types";

/**
 * Industrial and speciality chemicals.
 *
 * Chemicals carry regulatory obligations (SDS, UN numbers, hazard class,
 * import permits). Nothing here may be published as fact until verified —
 * an incorrect HS code or hazard classification on a chemical listing is a
 * compliance problem, not just a copy error.
 */
export const chemicalProducts: Product[] = [
  {
    slug: "industrial-salts",
    name: "Industrial Salts",
    categorySlug: "chemicals",
    summary:
      "Sodium and related industrial salts for chemical processing, water treatment and manufacturing feedstock.",
    grades: ["TODO: confirm grades and purity levels offered"],
    packaging: ["TODO: confirm bag sizes / jumbo bag options"],
    hsCode: "TODO: verify HS code",
    moq: "TODO: confirm minimum order quantity",
    specs: [
      { label: "Purity", value: "TODO: confirm (%)" },
      { label: "Moisture", value: "TODO: confirm (%)" },
      { label: "Insolubles", value: "TODO: confirm (%)" },
    ],
  },
  {
    slug: "water-treatment-chemicals",
    name: "Water Treatment Chemicals",
    categorySlug: "chemicals",
    summary:
      "Coagulants, flocculants and disinfection chemicals for municipal and industrial water treatment.",
    grades: ["TODO: confirm product list and grades"],
    packaging: ["TODO: confirm drum/bag packing"],
    hsCode: "TODO: verify HS codes (these vary per chemical)",
    moq: "TODO: confirm minimum order quantity",
  },
  {
    slug: "construction-chemicals",
    name: "Construction Chemicals",
    categorySlug: "chemicals",
    summary:
      "Admixtures, waterproofing compounds, tile adhesives and grouts for the construction sector.",
    grades: ["TODO: confirm product list and grades"],
    packaging: ["TODO: confirm bag/drum packing"],
    hsCode: "TODO: verify HS codes",
    moq: "TODO: confirm minimum order quantity",
  },
  {
    slug: "ceramic-raw-materials",
    name: "Ceramic Raw Materials",
    categorySlug: "chemicals",
    summary:
      "Frits, glazes, body stains and clay minerals — the input side of tile manufacturing, supplied to other producers.",
    grades: ["TODO: confirm material list and specifications"],
    packaging: ["TODO: confirm bag/jumbo bag packing"],
    hsCode: "TODO: verify HS codes",
    moq: "TODO: confirm minimum order quantity",
  },
];

/**
 * Regulatory note rendered on the chemicals category page.
 * Keep this — chemical buyers expect to see it, and it sets correct expectations.
 */
export const chemicalsComplianceNote =
  "Safety data sheets, hazard classification and country-specific import documentation are provided with every chemical enquiry. TODO: confirm which regulatory registrations (e.g. REACH, GHS-compliant SDS) Aayu Exim holds or can supply.";
