import type { Pillar, Stat } from "./_types";

/** The three business pillars, summarised on the home page. */
export const pillars: Pillar[] = [
  {
    slug: "ceramic-tiles",
    eyebrow: "Manufacturing",
    title: "Ceramic Tiles",
    summary:
      "Our core business. Tiles produced across four wholly-owned manufacturing units, exported to buyers, distributors and project contractors worldwide.",
    href: "/ceramic-tiles",
    highlights: [
      "Four wholly-owned manufacturing units",
      "Glazed vitrified, double charge and wall tile ranges",
      "Container-load export with buyer-specified packing",
    ],
  },
  {
    slug: "industrial",
    eyebrow: "Division",
    title: "Industrial & Turnkey",
    summary:
      "End-to-end delivery of industrial facilities — from factory construction and project management through to on-site finishing and installation.",
    href: "/industrial",
    highlights: [
      "Factory construction and civil works",
      "Single-point project management",
      "POP, ACP, electrical and tile-laying installation",
    ],
  },
  {
    slug: "export",
    eyebrow: "Trade",
    title: "Commodity Export Directory",
    summary:
      "A categorised directory of everything we source and ship — agricultural produce, industrial chemicals, and consumer plastics and clocks.",
    href: "/export",
    highlights: [
      "Categorised by industry for fast enquiry",
      "Grades, packing and MOQ listed per product",
      "Documentation and logistics handled in-house",
    ],
  },
];

/**
 * Group-level capability figures shown on the home page.
 * Per business instruction the four tile manufacturing units are referenced as
 * a capability only — their individual brand names are NOT published here.
 */
export const groupStats: Stat[] = [
  {
    value: "4",
    label: "Manufacturing units",
    note: "Wholly owned, ceramic tile production",
  },
  {
    value: "3",
    label: "Business divisions",
    note: "Tiles, industrial turnkey, commodity export",
  },
  {
    value: "TODO",
    label: "Export destinations",
    note: "TODO: confirm number of countries shipped to",
  },
  {
    value: "TODO",
    label: "Years in operation",
    note: "TODO: confirm year of incorporation",
  },
];
