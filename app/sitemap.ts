import type { MetadataRoute } from "next";
import { tileRanges } from "@/content/ceramic-tiles";
import { categories, getAllProductPaths } from "@/content/export";
import { industrialDivisions } from "@/content/industrial";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticPaths = ["/", "/ceramic-tiles", "/industrial", "/export", "/about", "/contact"];

  return [
    ...staticPaths.map((path) => ({
      url: url(path),
      lastModified: now,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...tileRanges.map((range) => ({
      url: url(`/ceramic-tiles/${range.slug}`),
      lastModified: now,
      priority: 0.7,
    })),
    ...industrialDivisions.map((division) => ({
      url: url(`/industrial/${division.slug}`),
      lastModified: now,
      priority: 0.7,
    })),
    ...categories.map((category) => ({
      url: url(`/export/${category.slug}`),
      lastModified: now,
      priority: 0.7,
    })),
    ...getAllProductPaths().map(({ category, product }) => ({
      url: url(`/export/${category}/${product}`),
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
