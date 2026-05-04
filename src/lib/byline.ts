import type { Article } from "./article";
import type { Locale } from "@/i18n/config";

export function getAuthorName(article: Article): string {
  return article.author?.name?.trim() || "Staff Reporter";
}

export function formatPublished(iso: string, locale: Locale = "en"): string {
  const d = new Date(iso);
  const loc = locale === "ur" ? "ur-PK" : "en-IN";
  return new Intl.DateTimeFormat(loc, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(d);
}
