import type { Article } from "./article";

export function getAuthorName(article: Article): string {
  return article.author?.name?.trim() || "Staff Reporter";
}

export function formatPublished(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(d);
}
