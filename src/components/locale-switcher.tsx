"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/path";
import type { UiDictionary } from "@/i18n/dictionary";

export function LocaleSwitcher({
  dict,
  current,
}: {
  dict: UiDictionary;
  current: Locale;
}) {
  const pathname = usePathname() ?? "/en";

  return (
    <span className="inline-flex items-center gap-2 rounded border border-theme px-2 py-0.5 font-sans text-utility font-medium">
      <Link
        href={switchLocalePath(pathname, "en")}
        className={
          current === "en"
            ? "text-[var(--text-primary)]"
            : "text-[var(--link)] hover:underline"
        }
        hrefLang="en"
      >
        {dict.utilityLangEn}
      </Link>
      <span className="text-[var(--text-tertiary)]" aria-hidden>
        |
      </span>
      <Link
        href={switchLocalePath(pathname, "ur")}
        className={
          current === "ur"
            ? "text-[var(--text-primary)]"
            : "text-[var(--link)] hover:underline"
        }
        hrefLang="ur"
        lang="ur"
      >
        {dict.utilityLangUr}
      </Link>
    </span>
  );
}
