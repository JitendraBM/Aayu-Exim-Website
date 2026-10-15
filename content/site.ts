/**
 * Company-level facts, navigation and contact details.
 *
 * IMPORTANT: the previous WordPress site shipped with its theme's demo contact
 * details — an invented overseas address and foreign phone numbers — published
 * as though they were Aayu Exim's own. Nothing in this file may be invented.
 * Unconfirmed values stay as `TODO:` strings until the business supplies the
 * real ones. `npm run check:placeholders` blocks a release while any remain.
 */

export const site = {
  name: "Aayu Exim",
  legalName: "Aayu Exim",
  tagline: "Trade with Trust",
  description:
    "Aayu Exim was founded by people who have set benchmarks in their fields. The Aayu Tiles Group includes ceramic tile and industrial ceramics manufacturers, importers, exporters and ceramic technology specialists.",
  /** Production origin. Update if the final domain differs. */
  url: "https://www.aayuexim.com",
  locale: "en_IN",
} as const;

export const contact = {
  addressLines: [
    "Parshwanath Complex, Opp. Kuber Cinema",
    "8-A National Highway",
    "Morbi - 363642, Gujarat",
    "India",
  ],
  phones: ["+91 98795 04347"],
  emails: ["info@aayuexim.com"],
  /** Optional; omit entirely rather than guessing. */
  whatsapp: "+91 98795 04347",
  officeHours: "Mon–Fri, 09:00–18:00 IST",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Ceramic Tiles", href: "/ceramic-tiles" },
  { label: "Industrial Turnkey Projects", href: "/industrial" },
  { label: "Products", href: "/export" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Ceramic Tiles",
    items: [
      { label: "Overview", href: "/ceramic-tiles" },
      { label: "Glazed Vitrified", href: "/ceramic-tiles/glazed-vitrified" },
      { label: "Double Charge Vitrified", href: "/ceramic-tiles/double-charge-vitrified" },
      { label: "Wall Tiles", href: "/ceramic-tiles/wall-tiles" },
    ],
  },
  {
    heading: "Industrial Turnkey Projects",
    items: [
      { label: "Overview", href: "/industrial" },
      { label: "Factory Construction", href: "/industrial/factory-construction" },
      { label: "Installation", href: "/industrial/installation" },
    ],
  },
  {
    heading: "Products",
    items: [
      { label: "All categories", href: "/export" },
      { label: "Agricultural", href: "/export/agricultural" },
      { label: "Chemicals", href: "/export/chemicals" },
      { label: "Consumer Plastics & Clocks", href: "/export/consumer-plastics-clocks" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
