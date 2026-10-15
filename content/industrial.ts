import type { LandingPage, Stat } from "./_types";

export const industrialIntro =
  "Our Industrial & Turnkey division builds and fits out industrial facilities end to end. One contract covers civil construction, programme management and every finishing trade — so the client deals with a single accountable party from foundation to handover.";

export const industrialStats: Stat[] = [
  { value: "TODO", label: "Projects delivered", note: "TODO: confirm count" },
  { value: "TODO", label: "Built-up area completed", note: "TODO: confirm sq. ft." },
  { value: "4", label: "Installation trades in-house", note: "POP, ACP, electrical, tile laying" },
  { value: "TODO", label: "Site team strength", note: "TODO: confirm headcount" },
];

/** Landing pages under /industrial/[slug]. */
export const industrialDivisions: LandingPage[] = [
  {
    slug: "factory-construction",
    title: "Factory Construction",
    shortTitle: "Factory Construction",
    metaDescription:
      "Aayu Exim builds industrial facilities end to end — site development, civil works, PEB structures and services infrastructure.",
    intro:
      "We build the shell and the systems: site development, foundations, pre-engineered steel structures, flooring and the services infrastructure a working plant needs on day one.",
    blocks: [
      {
        title: "Scope of works",
        body: "A factory construction contract with us typically covers the full civil and structural package, coordinated against the client's process layout.",
        bullets: [
          "Site levelling, development and boundary works",
          "Foundations, plinths and machine bases",
          "Pre-engineered building (PEB) structures and roofing",
          "Industrial flooring, including heavy-load and chemical-resistant systems",
          "Services infrastructure — power distribution, water, drainage and compressed air routing",
        ],
      },
      {
        title: "Working from your process layout",
        body: "Industrial buildings fail when the structure is designed before the process is fixed. We start from the equipment layout and material flow, then size bays, heights, floor loading and service routes around it — which avoids the expensive retrofits that follow a generic shed.",
      },
      {
        title: "Compliance and approvals",
        body: "TODO: describe support provided for statutory approvals — building plan sanction, factory licence, fire NOC, pollution control board consent and any state-specific clearances.",
      },
    ],
  },
  {
    slug: "installation",
    title: "Installation & Finishing",
    shortTitle: "Installation",
    metaDescription:
      "In-house installation crews for POP, ACP cladding, electrical works and tile laying across industrial and commercial projects.",
    intro:
      "Four finishing trades run in-house rather than through subcontractors: POP, ACP cladding, electrical works and tile laying. Keeping them under one roof is what lets us sequence them tightly and stand behind the finish.",
    blocks: [
      {
        title: "POP — plaster of Paris",
        body: "False ceilings, cornices, partitions and decorative profile work in POP and gypsum board, including the framing and the finished paint-ready surface.",
        bullets: [
          "Suspended and fixed false ceilings",
          "Cornices, mouldings and profile detailing",
          "Gypsum partitions and bulkheads",
          "TODO: confirm typical span/area capability per crew",
        ],
      },
      {
        title: "ACP — aluminium composite panel cladding",
        body: "External and internal ACP cladding — façades, elevations, canopies, column casings and signage backing, including the substructure.",
        bullets: [
          "Façade and elevation cladding systems",
          "Aluminium substructure fabrication and fixing",
          "Canopies, fascias and column casings",
          "TODO: confirm panel brands/grades typically supplied",
        ],
      },
      {
        title: "Electrical works",
        body: "Internal electrical installation for industrial and commercial buildings.",
        bullets: [
          "Conduiting, cable trays and wiring",
          "Distribution boards and panel installation",
          "Lighting layouts and fixture installation",
          "Earthing and protection systems",
          "TODO: confirm licensed electrical contractor registration details",
        ],
      },
      {
        title: "Tile laying",
        body: "Professional tile installation — the natural extension of our tile manufacturing. Crews are experienced in large-format vitrified laying, where substrate preparation and adhesive selection decide whether a floor lasts.",
        bullets: [
          "Substrate preparation and levelling",
          "Large-format vitrified floor laying",
          "Wall cladding and dry-cladding systems",
          "Skirting, grouting and finishing",
        ],
      },
    ],
  },
];

export function getIndustrialDivision(slug: string): LandingPage | undefined {
  return industrialDivisions.find((division) => division.slug === slug);
}
