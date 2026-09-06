/**
 * Shared content types for the Aayu Exim site.
 *
 * All site copy lives in `content/` as typed data — there is no CMS.
 * Anything not yet confirmed by the business is written with a `TODO:` prefix
 * so it is obvious on the page and greppable before launch.
 * See PLACEHOLDERS.md for the full checklist.
 */

/** A single statistic shown in a StatBand (e.g. "4" / "Manufacturing units"). */
export interface Stat {
  value: string;
  label: string;
  /** Optional clarifier shown under the label. */
  note?: string;
}

/** A generic linked card used across hub pages. */
export interface Card {
  title: string;
  description: string;
  href?: string;
  /** Short label rendered above the title (e.g. "Division"). */
  eyebrow?: string;
}

/** A titled block of prose with optional bullet points. */
export interface ContentBlock {
  title: string;
  body: string;
  bullets?: string[];
}

/** One of the three top-level business pillars shown on the home page. */
export interface Pillar {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  highlights: string[];
}

/** A dedicated landing page under the Industrial & Turnkey division. */
export interface LandingPage {
  slug: string;
  title: string;
  /** Used for <title> and nav labels where the full title is too long. */
  shortTitle: string;
  intro: string;
  metaDescription: string;
  blocks: ContentBlock[];
  stats?: Stat[];
}

/** A ceramic tile product range. */
export interface TileRange {
  slug: string;
  name: string;
  summary: string;
  metaDescription: string;
  /** Nominal sizes offered, e.g. "600x600 mm". */
  sizes: string[];
  finishes: string[];
  applications: string[];
  /** Key/value technical rows rendered in a SpecTable. */
  specs: SpecRow[];
}

/** One row of a technical specification table. */
export interface SpecRow {
  label: string;
  value: string;
}

/** A commodity export category (Agricultural, Chemicals, ...). */
export interface Category {
  slug: string;
  name: string;
  summary: string;
  metaDescription: string;
}

/** A single exportable commodity within a category. */
export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  summary: string;
  /** Free-text grade/variety notes. */
  grades?: string[];
  packaging?: string[];
  /** Harmonised System code. `TODO:` until confirmed by the trade desk. */
  hsCode?: string;
  moq?: string;
  specs?: SpecRow[];
}
