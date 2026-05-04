import sanitizeHtml from "sanitize-html";

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
