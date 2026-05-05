import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/path";
import type { UiDictionary } from "@/i18n/dictionary";

export function RkLocalePillsServer({
  dict,
  current,
  pathname,
}: {
  dict: UiDictionary;
  current: Locale;
  pathname: string;
}) {
  const safePath = pathname?.startsWith("/") ? pathname : `/${current}`;
  return (
    <>
      <Link
        href={switchLocalePath(safePath, "en")}
        className={`rk-pill ${current === "en" ? "is-on" : ""}`}
        hrefLang="en"
        aria-current={current === "en" ? "true" : undefined}
      >
        EN
      </Link>
      <Link
        href={switchLocalePath(safePath, "ur")}
        className={`rk-pill ${current === "ur" ? "is-on" : ""}`}
        hrefLang="ur"
        lang="ur"
        aria-current={current === "ur" ? "true" : undefined}
      >
        {dict.utilityLangUr}
      </Link>
    </>
  );
}

