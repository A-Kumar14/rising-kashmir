"use client";

import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import { PRIMARY_SECTIONS } from "@/lib/sections";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RkNavSearch } from "./rk-nav-search";

export function PrimaryNav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: UiDictionary;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const homePath = withLocale(locale, "/");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const isHome =
    pathname === homePath ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;

  const moreActive = dict.moreMenu.some((m) =>
    pathname.startsWith(withLocale(locale, m.hrefSuffix)),
  );

  return (
    <nav className="rk-nav" aria-label="Primary">
      <div className="rk-nav__inner hidden md:flex">
        <ul className="rk-nav__list">
          <li>
            <Link
              href={homePath}
              className={`rk-nav__link ${isHome ? "is-current" : ""}`}
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
                  className={`rk-nav__link ${active ? "is-current" : ""}`}
                >
                  {dict.sectionLabels[slug] ?? slug}
                </Link>
              </li>
            );
          })}
          <li className="rk-nav__more" ref={moreRef}>
            <button
              type="button"
              className={`rk-nav__link ${moreActive ? "is-current" : ""}`}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setMoreOpen((o) => !o);
              }}
            >
              {dict.navMore} ▾
            </button>
            {moreOpen ? (
              <div
                className="rk-nav__pop"
                onMouseLeave={() => setMoreOpen(false)}
                role="menu"
              >
                {dict.moreMenu.map((item) => (
                  <Link
                    key={item.label + item.hrefSuffix}
                    href={withLocale(locale, item.hrefSuffix)}
                    className="rk-nav__pop-item"
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </li>
        </ul>
        <RkNavSearch
          locale={locale}
          placeholder={dict.rkSearchPlaceholder}
        />
      </div>

      <details className="rk-nav-mobile md:hidden">
        <summary className="rk-nav-mobile__summary">{dict.navMenu} ▾</summary>
        <ul className="rk-nav-mobile__list">
          <li>
            <Link href={homePath}>{dict.navHome}</Link>
          </li>
          {PRIMARY_SECTIONS.map((slug) => (
            <li key={slug}>
              <Link href={withLocale(locale, `/section/${slug}`)}>
                {dict.sectionLabels[slug] ?? slug}
              </Link>
            </li>
          ))}
          {dict.moreMenu.map((item) => (
            <li key={item.label}>
              <Link href={withLocale(locale, item.hrefSuffix)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
