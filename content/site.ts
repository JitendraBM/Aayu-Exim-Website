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
  legalName: "TODO: registered legal entity name",
  tagline: "Global Trade, Delivered with Trust",
  description:
    "Aayu Exim is an Indian export house spanning ceramic tiles, industrial turnkey projects and a broad commodity export portfolio.",
  /** Production origin. Update if the final domain differs. */
  url: "https://www.aayuexim.com",
  locale: "en_IN",
} as const;

export const contact = {
  addressLines: [
    "TODO: office address line 1",
    "TODO: office address line 2",
    "TODO: city, state, PIN",
    "India",
  ],
  phones: ["TODO: primary phone (with +91 country code)"],
  emails: ["TODO: enquiries@aayuexim.com"],
  /** Optional; omit entirely rather than guessing. */
  whatsapp: "TODO: WhatsApp business number",
  officeHours: "TODO: e.g. Mon–Sat, 09:30–18:30 IST",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Ceramic Tiles", href: "/ceramic-tiles" },
  { label: "Industrial & Turnkey", href: "/industrial" },
  { label: "Export Directory", href: "/export" },
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
    heading: "Industrial & Turnkey",
    items: [
      { label: "Overview", href: "/industrial" },
      { label: "Factory Construction", href: "/industrial/factory-construction" },
      { label: "Project Management", href: "/industrial/project-management" },
      { label: "Installation", href: "/industrial/installation" },
    ],
  },
  {
    heading: "Export Directory",
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
