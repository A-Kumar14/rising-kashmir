import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { articles, getColumnists } from "@/lib/cms";
import { ALL_SECTION_SLUGS } from "@/lib/sections";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://risingkashmir.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/columnists",
  ];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("hourly" as const) : ("monthly" as const),
      priority: path === "" ? 1.0 : 0.4,
    })),
  );

  const sectionEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    ALL_SECTION_SLUGS.map((s) => ({
      url: `${BASE_URL}/${locale}/section/${s}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.7,
    })),
  );

  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articles.map((a) => ({
      url: `${BASE_URL}/${locale}/article/${a.slug}`,
      lastModified: new Date(a.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  const columnistEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getColumnists().map((c) => ({
      url: `${BASE_URL}/${locale}/columnists/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  );

  return [
    ...staticEntries,
    ...sectionEntries,
    ...articleEntries,
    ...columnistEntries,
  ];
}
