import sanitizeHtml from "sanitize-html";

/**
 * Iframe policy: NOT allowed in P0. Article body is sanitized to text + images
 * + headings + figures only. When video embeds ship (P1), extend `allowedTags`
 * to include `iframe` and gate `src` on a per-host allow-list (YouTube, JW
 * Player, Dailymotion). Do not allow arbitrary iframes — they bypass the CSP
 * `frame-ancestors 'none'` set in `next.config.mjs` for first-party content
 * but expose readers to third-party tracking and clickjacking on embedded
 * pages.
 */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "h2",
      "h3",
      "h4",
      "figure",
      "figcaption",
      "cite",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "loading"],
      a: ["href", "name", "target", "rel"],
      p: ["class"],
      div: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
        },
      }),
    },
  });
}
