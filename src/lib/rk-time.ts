import type { Locale } from "@/i18n/config";

export function rkDateline(locale: Locale): string {
  const loc = locale === "ur" ? "ur-PK" : "en-IN";
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const s = new Intl.DateTimeFormat(loc, opts).format(new Date());
  return locale === "en" ? s.toUpperCase() : s;
}

export function rkRelTime(iso: string, locale: Locale): string {
  const t = new Date(iso).getTime();
  const diffH = Math.round((Date.now() - t) / 36e5);
  if (locale === "ur") {
    if (diffH < 1) return "ابھی ابھی";
    if (diffH < 24) return `${diffH} گھنٹے قبل`;
    return `${Math.round(diffH / 24)} دن قبل`;
  }
  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.round(diffH / 24)}d ago`;
}
