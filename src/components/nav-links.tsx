"use client";

import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import { PRIMARY_SECTIONS } from "@/lib/sections";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavMore } from "./nav-more";

export function NavLinks({
  locale,
  dict,
}: {
  locale: Locale;
  dict: UiDictionary;
}) {
  const pathname = usePathname() ?? `/${locale}`;

  const homePath = withLocale(locale, "/");
  const isHome =
    pathname === homePath ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;

  return (
    <>
      <ul className="hidden flex-1 flex-wrap items-center gap-x-6 md:flex lg:gap-x-8">
        <li>
          <Link
            href={homePath}
            className={`inline-block border-b-2 pb-3 pt-3 font-sans text-nav font-medium transition-colors duration-120 hover:text-[var(--text-secondary)] ${
              isHome
                ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-primary)]"
            }`}
          >
            {dict.navHome}
          </Link>
        </li>
        {PRIMARY_SECTIONS.map((slug) => {
          const href = withLocale(locale, `/section/${slug}`);
          const active =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={slug}>
              <Link
                href={href}
                className={`inline-block border-b-2 pb-3 pt-3 font-sans text-nav font-medium transition-colors duration-120 hover:text-[var(--text-secondary)] ${
                  active
                    ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-primary)]"
                }`}
              >
                {dict.sectionLabels[slug] ?? slug}
              </Link>
            </li>
          );
        })}
        <li className="ms-auto">
          <NavMore locale={locale} dict={dict} currentPath={pathname} />
        </li>
      </ul>

      <details className="group relative w-full py-2 md:hidden">
        <summary className="cursor-pointer list-none font-sans text-nav font-medium text-[var(--text-primary)]">
          <span className="flex items-center justify-between">
            {dict.navMenu}
            <span aria-hidden className="text-[var(--text-tertiary)]">
              ▾
            </span>
          </span>
        </summary>
        <ul className="mt-2 flex flex-col gap-1 border border-theme bg-[var(--bg-secondary)] p-3">
          <li>
            <Link
              href={homePath}
              className="block py-2 font-sans text-nav font-medium"
            >
              {dict.navHome}
            </Link>
          </li>
          {PRIMARY_SECTIONS.map((slug) => (
            <li key={slug}>
              <Link
                href={withLocale(locale, `/section/${slug}`)}
                className="block py-2 font-sans text-nav font-medium"
              >
                {dict.sectionLabels[slug] ?? slug}
              </Link>
            </li>
          ))}
          <li className="border-t border-theme pt-2 font-sans text-eyebrow font-medium uppercase tracking-[1px] text-[var(--text-tertiary)]">
            {dict.navMore}
          </li>
          {dict.moreMenu.map((item) => (
            <li key={item.label}>
              <Link
                href={withLocale(locale, item.hrefSuffix)}
                className="block py-2 font-sans text-nav font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
