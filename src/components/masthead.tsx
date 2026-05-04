import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import Link from "next/link";

export function Masthead({
  locale,
  dict,
}: {
  locale: Locale;
  dict: UiDictionary;
}) {
  const titleClass =
    locale === "ur"
      ? "rk-masthead__title is-urdu"
      : "rk-masthead__title";

  return (
    <header className="rk-masthead">
      <div className="rk-masthead__inner">
        <div className="rk-masthead__sidebar rk-masthead__sidebar--left">
          <div className="rk-stamp">
            <div className="rk-stamp__line">{dict.rkStampVol}</div>
            <div className="rk-stamp__line">{dict.rkStampNo}</div>
            <div className="rk-stamp__line rk-stamp__line--em">
              {dict.rkStampSrinagar}
            </div>
          </div>
        </div>
        <div className="rk-masthead__center">
          <p className="rk-masthead__eyebrow">{dict.mastheadEyebrow}</p>
          <Link href={withLocale(locale, "/")} className={titleClass}>
            {dict.mastheadTitle}
          </Link>
          <div className="rk-masthead__rule">
            <span className="rk-masthead__rule-dot" />
            <span className="rk-masthead__rule-line" />
            <span className="rk-masthead__rule-text">
              {locale === "en"
                ? dict.todayLine.toUpperCase()
                : dict.todayLine}
            </span>
            <span className="rk-masthead__rule-line" />
            <span className="rk-masthead__rule-dot" />
          </div>
        </div>
        <div className="rk-masthead__sidebar rk-masthead__sidebar--right">
          <div className="rk-stamp rk-stamp--right">
            <div className="rk-stamp__line">{dict.rkStampEst}</div>
            <div className="rk-stamp__line">{dict.rkStampPrintWeb}</div>
            <div className="rk-stamp__line rk-stamp__line--em">
              {dict.rkEditionLate}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
