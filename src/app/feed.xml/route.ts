import { articles } from "@/lib/cms";
import { formatSectionLabel } from "@/lib/sections-label";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://risingkashmir.com";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const items = [...articles]
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
    )
    .slice(0, 50)
    .map((a) => {
      const link = `${BASE_URL}/article/${a.slug}`;
      const category = formatSectionLabel(a.section);
      return `<item>
  <title>${escape(a.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
  <category>${escape(category)}</category>
  ${a.dek ? `<description>${escape(a.dek)}</description>` : ""}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rising Kashmir</title>
    <link>${BASE_URL}</link>
    <description>Latest news from Rising Kashmir.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
