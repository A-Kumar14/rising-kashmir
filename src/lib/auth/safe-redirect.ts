import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";

/**
 * Only allow same-site relative paths that start with a known locale prefix.
 * Prevents open redirects after login/logout.
 */
export function safeLocalePath(raw: string | null | undefined, locale: Locale): string {
  if (!raw || typeof raw !== "string") return `/${locale}`;
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//")) return `/${locale}`;
  const parts = t.split("/").filter(Boolean);
  const first = parts[0];
  if (!first || !isLocale(first)) return `/${locale}`;
  return t;
}
