import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import { rkDateline } from "@/lib/rk-time";
import { RkLocalePills } from "./rk-locale-pills";
import { RkThemeCycle } from "./rk-theme-client";

export function UtilityBar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: UiDictionary;
}) {
  return (
    <div className="rk-util">
      <div className="rk-util__inner">
        <div className="rk-util__left">
          <time
            className="rk-util__date"
            dateTime={new Date().toISOString()}
            suppressHydrationWarning
          >
            {rkDateline(locale)}
          </time>
          <span className="rk-util__dot" aria-hidden>
            ●
          </span>
          <span className="rk-util__weather">{dict.utilityWeather}</span>
        </div>
        <div className="rk-util__right">
          <RkLocalePills dict={dict} current={locale} />
          <span className="rk-util__sep" aria-hidden>
            │
          </span>
          <a
            href={withLocale(locale, "/e-paper")}
            className="rk-util__link"
          >
            {dict.utilityEpaper}
          </a>
          <RkThemeCycle
            labels={{
              light: `☼ ${dict.rkThemeLight}`,
              dark: `☾ ${dict.rkThemeDark}`,
              sepia: `✦ ${dict.rkThemeSepia}`,
            }}
          />
          <a href="#newsletter-band" className="rk-util__sub">
            {dict.rkSubscribe}
          </a>
        </div>
      </div>
    </div>
  );
}
