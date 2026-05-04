const SLUG_REGEX = /^[a-z0-9-]+$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

/**
 * Normalizes backend slugs to kebab-case ASCII. Logs when transformation occurs.
 */
export function normalizeSlug(raw: string, context?: string): string {
  const normalized = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  if (!isValidSlug(raw)) {
    console.warn(
      `[slug] Invalid slug from API${context ? ` (${context})` : ""}: "${raw}" → "${normalized}"`,
    );
  }

  return normalized || "article";
}

export function articleHref(slug: string): string {
  const safe = normalizeSlug(slug, "articleHref");
  return `/article/${safe}`;
}

export function sectionHref(section: string): string {
  const safe = normalizeSlug(section, "sectionHref");
  return `/section/${safe}`;
}

export function columnistHref(slug: string): string {
  const safe = normalizeSlug(slug, "columnistHref");
  return `/columnists/${safe}`;
}
