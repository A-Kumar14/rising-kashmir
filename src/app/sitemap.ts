import type { MetadataRoute } from "next";
import { articles, getColumnists } from "@/lib/cms";
import { ALL_SECTION_SLUGS } from "@/lib/sections";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://risingkashmir.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "hourly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/columnists`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const sectionEntries: MetadataRoute.Sitemap = ALL_SECTION_SLUGS.map((s) => ({
    url: `${BASE_URL}/section/${s}`,
    lastModified: now,
    changeFrequency: "hourly",
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/article/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const columnistEntries: MetadataRoute.Sitemap = getColumnists().map((c) => ({
    url: `${BASE_URL}/columnists/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...sectionEntries,
    ...articleEntries,
    ...columnistEntries,
  ];
}
