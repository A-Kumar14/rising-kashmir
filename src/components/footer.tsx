import Link from "next/link";
import { PRIMARY_SECTIONS } from "@/lib/sections";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";

type Props = {
  locale: Locale;
  dict: UiDictionary;
};

export function SiteFooter({ locale, dict }: Props) {
  const titleClass =
    locale === "ur" ? "rk-footer__title is-urdu" : "rk-footer__title";

  return (
    <footer className="rk-footer">
      <div className="rk-footer__inner">
        <div className="rk-footer__brand">
          <p className={titleClass}>{dict.mastheadTitle}</p>
          <p className="rk-footer__addr">{dict.rkFooterAddress}</p>
          <p className="rk-footer__addr rk-footer__addr--alt">
            {dict.rkFooterAddressAlt}
          </p>
        </div>
        <div className="rk-footer__cols">
          <div>
            <p className="rk-footer__h">{dict.footerSections}</p>
            <ul>
              {PRIMARY_SECTIONS.map((s) => (
                <li key={s}>
                  <Link href={withLocale(locale, `/section/${s}`)}>
                    {dict.sectionLabels[s] ?? s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="rk-footer__h">{dict.navMore}</p>
            <ul>
              {dict.moreMenu.map((item) => (
                <li key={item.label}>
                  <Link href={withLocale(locale, item.hrefSuffix)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="rk-footer__h">{dict.footerAbout}</p>
            <ul>
              <li>
                <Link href={withLocale(locale, "/about")}>
                  {dict.footerAboutLink}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/contact")}>
                  {dict.footerContact}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/privacy")}>
                  {dict.footerPrivacy}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/terms")}>
                  {dict.footerTerms}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/cookies")}>
                  {dict.footerCookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="rk-footer__bottom">
        <p>
          © {new Date().getFullYear()} Rising Kashmir. {dict.footerRights}{" "}
          <a href="/feed.xml" className="rk-footer__rss">
            {dict.footerRss}
          </a>
        </p>
        <p>{dict.rkFooterTagline}</p>
      </div>
    </footer>
  );
}
