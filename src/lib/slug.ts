import type { Locale } from "@/i18n/config";

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

export function articleHref(locale: Locale, slug: string): string {
  const safe = normalizeSlug(slug, "articleHref");
  return `/${locale}/article/${safe}`;
}

export function sectionHref(locale: Locale, section: string): string {
  const safe = normalizeSlug(section, "sectionHref");
  return `/${locale}/section/${safe}`;
}

export function columnistHref(locale: Locale, slug: string): string {
  const safe = normalizeSlug(slug, "columnistHref");
  return `/${locale}/columnists/${safe}`;
}
