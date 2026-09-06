import type { ContentBlock, Stat, TileRange } from "./_types";

export const ceramicTilesIntro =
  "Ceramic tiles are Aayu Exim's founding business. We manufacture across four wholly-owned units and export finished tile to distributors, retail chains and project contractors — supported in-house by our own installation crews.";

/**
 * NOTE: the four manufacturing units trade under their own brand names, which
 * the business has chosen NOT to publish on this site for now. Reference them
 * as capacity and capability only. Do not add unit names or logos without
 * explicit sign-off.
 */
export const manufacturingStats: Stat[] = [
  {
    value: "4",
    label: "Manufacturing units",
    note: "Wholly owned and operated",
  },
  {
    value: "TODO",
    label: "Combined daily capacity",
    note: "TODO: confirm sq. m. per day across all units",
  },
  {
    value: "TODO",
    label: "Kiln lines",
    note: "TODO: confirm total production lines",
  },
  {
    value: "TODO",
    label: "Monthly export volume",
    note: "TODO: confirm containers shipped per month",
  },
];

export const manufacturingBlocks: ContentBlock[] = [
  {
    title: "Owned production, not brokered supply",
    body: "We are not a trading intermediary for tiles. Production runs through four manufacturing units under our own control, which means we set the schedule, hold the quality standard and commit to delivery dates directly rather than passing them down a supply chain.",
  },
  {
    title: "Quality control",
    body: "TODO: describe the in-house QC process — batch testing, tolerance checks, sorting and grading before packing.",
    bullets: [
      "TODO: dimensional and warpage tolerance checks",
      "TODO: water absorption and breaking strength testing",
      "TODO: shade and calibre sorting before palletising",
    ],
  },
  {
    title: "Export packing and logistics",
    body: "TODO: describe standard export packing — carton specification, pallet configuration, container loading pattern and documentation supplied.",
  },
];

export const certifications: string[] = [
  "TODO: list held certifications (e.g. ISO 9001, CE marking, BIS) — do not publish any certification not actually held.",
];

/** Tile ranges. Slugs drive /ceramic-tiles/[range]. */
export const tileRanges: TileRange[] = [
  {
    slug: "glazed-vitrified",
    name: "Glazed Vitrified Tiles (GVT)",
    summary:
      "Full-body vitrified base with a digitally printed glazed surface. The broadest design range we produce — marble, stone, wood and concrete looks for floors and feature walls.",
    metaDescription:
      "Glazed vitrified tiles (GVT) manufactured and exported by Aayu Exim — sizes, finishes and technical specifications.",
    sizes: ["600x600 mm", "600x1200 mm", "800x800 mm", "TODO: confirm full size list"],
    finishes: ["Matt", "Glossy", "Carving / textured", "TODO: confirm finish list"],
    applications: [
      "Residential flooring",
      "Commercial and retail flooring",
      "Feature and cladding walls",
    ],
    specs: [
      { label: "Water absorption", value: "TODO: confirm (% per ISO 10545-3)" },
      { label: "Breaking strength", value: "TODO: confirm (N per ISO 10545-4)" },
      { label: "Surface abrasion (PEI)", value: "TODO: confirm class" },
      { label: "Thickness", value: "TODO: confirm (mm)" },
      { label: "Pieces per box / box weight", value: "TODO: confirm" },
    ],
  },
  {
    slug: "double-charge-vitrified",
    name: "Double Charge Vitrified Tiles",
    summary:
      "Two layers of pigment pressed together so the pattern runs several millimetres deep. Built for heavy-footfall commercial floors where surface wear is a real concern.",
    metaDescription:
      "Double charge vitrified tiles manufactured and exported by Aayu Exim — sizes, finishes and technical specifications.",
    sizes: ["600x600 mm", "800x800 mm", "TODO: confirm full size list"],
    finishes: ["Polished", "Matt", "TODO: confirm finish list"],
    applications: [
      "Airports, malls and transit halls",
      "Office lobbies and corridors",
      "High-traffic institutional flooring",
    ],
    specs: [
      { label: "Water absorption", value: "TODO: confirm (% per ISO 10545-3)" },
      { label: "Breaking strength", value: "TODO: confirm (N per ISO 10545-4)" },
      { label: "Pattern depth", value: "TODO: confirm (mm)" },
      { label: "Thickness", value: "TODO: confirm (mm)" },
      { label: "Pieces per box / box weight", value: "TODO: confirm" },
    ],
  },
  {
    slug: "wall-tiles",
    name: "Ceramic Wall Tiles",
    summary:
      "Lightweight glazed ceramic for interior walls — kitchens, bathrooms and utility areas, in gloss, matt and highlighter sets.",
    metaDescription:
      "Ceramic wall tiles manufactured and exported by Aayu Exim — sizes, finishes and technical specifications.",
    sizes: ["300x450 mm", "300x600 mm", "TODO: confirm full size list"],
    finishes: ["Glossy", "Matt", "Highlighter / décor", "TODO: confirm finish list"],
    applications: ["Bathroom walls", "Kitchen splashbacks", "Utility and service areas"],
    specs: [
      { label: "Water absorption", value: "TODO: confirm (% per ISO 10545-3)" },
      { label: "Breaking strength", value: "TODO: confirm (N per ISO 10545-4)" },
      { label: "Thickness", value: "TODO: confirm (mm)" },
      { label: "Pieces per box / box weight", value: "TODO: confirm" },
    ],
  },
  {
    slug: "parking-and-outdoor",
    name: "Parking & Outdoor Tiles",
    summary:
      "Heavy-duty anti-skid tiles for driveways, parking decks, terraces and external paving, engineered for load and weather exposure.",
    metaDescription:
      "Parking and outdoor anti-skid tiles manufactured and exported by Aayu Exim — sizes, finishes and technical specifications.",
    sizes: ["300x300 mm", "400x400 mm", "TODO: confirm full size list"],
    finishes: ["Anti-skid textured", "Rustic", "TODO: confirm finish list"],
    applications: ["Driveways and parking decks", "Terraces and balconies", "External paving"],
    specs: [
      { label: "Water absorption", value: "TODO: confirm (% per ISO 10545-3)" },
      { label: "Slip resistance", value: "TODO: confirm (R rating)" },
      { label: "Breaking strength", value: "TODO: confirm (N per ISO 10545-4)" },
      { label: "Thickness", value: "TODO: confirm (mm)" },
    ],
  },
];

export function getTileRange(slug: string): TileRange | undefined {
  return tileRanges.find((range) => range.slug === slug);
}
