import type { Locale } from "./config";

export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "ur") {
    parts[0] = target;
    return "/" + parts.join("/");
  }
  return `/${target}${pathname === "/" ? "" : pathname}`;
}

export function withLocale(locale: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `/${locale}`;
  return `/${locale}${p}`;
}
