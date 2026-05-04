import type { Article } from "./article";
import type { Locale } from "@/i18n/config";

export function getArticleTitle(article: Article, locale: Locale): string {
  if (locale === "ur" && article.i18n?.ur) {
    return article.i18n.ur.title;
  }
  return article.title;
}

export function getArticleDek(
  article: Article,
  locale: Locale,
): string | null {
  if (locale === "ur" && article.i18n?.ur) {
    return article.i18n.ur.dek;
  }
  return article.dek;
}

export function getArticleBody(article: Article, locale: Locale): string {
  if (locale === "ur" && article.i18n?.ur?.body) {
    return article.i18n.ur.body;
  }
  return article.body;
}

export function getSectionLabel(
  section: string,
  labels: Record<string, string>,
): string {
  return labels[section] ?? section;
}
