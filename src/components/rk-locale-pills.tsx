"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/path";
import type { UiDictionary } from "@/i18n/dictionary";

export function RkLocalePills({
  dict,
  current,
}: {
  dict: UiDictionary;
  current: Locale;
}) {
  const pathname = usePathname() ?? "/en";

  return (
    <>
      <Link
        href={switchLocalePath(pathname, "en")}
        className={`rk-pill ${current === "en" ? "is-on" : ""}`}
        hrefLang="en"
        aria-current={current === "en" ? "true" : undefined}
      >
        EN
      </Link>
      <Link
        href={switchLocalePath(pathname, "ur")}
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
