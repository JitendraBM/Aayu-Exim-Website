import type { Category, Product } from "../_types";
import { agriculturalProducts } from "./agricultural";
import { categories, getCategory } from "./categories";
import { chemicalProducts } from "./chemicals";
import { consumerProducts } from "./consumer-plastics-clocks";

/**
 * Single lookup for the export directory.
 * To add a category: create its product file, import it, and add it here plus
 * to `categories` in ./categories.ts.
 */
const productsByCategory: Record<string, Product[]> = {
  agricultural: agriculturalProducts,
  chemicals: chemicalProducts,
  "consumer-plastics-clocks": consumerProducts,
};

export { categories, getCategory };
export type { Category, Product };

export function getProductsByCategory(categorySlug: string): Product[] {
  return productsByCategory[categorySlug] ?? [];
}

export function getProduct(categorySlug: string, productSlug: string): Product | undefined {
  return getProductsByCategory(categorySlug).find((product) => product.slug === productSlug);
}

/** Every (category, product) pair — used by generateStaticParams and the sitemap. */
export function getAllProductPaths(): { category: string; product: string }[] {
  return categories.flatMap((category) =>
    getProductsByCategory(category.slug).map((product) => ({
      category: category.slug,
      product: product.slug,
    })),
  );
}

export function getProductCount(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}
