import { headers } from "next/headers";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import { rkDateline } from "@/lib/rk-time";
import { getSrinagarWeatherLine } from "@/lib/weather";
import { RkLocalePillsServer } from "./rk-locale-pills-server";
import { RkThemeCycle } from "./rk-theme-client";
import { UtilityAuthSlot } from "./utility-auth-slot";

export async function UtilityBar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: UiDictionary;
}) {
  const weather = await getSrinagarWeatherLine();
  const pathname = headers().get("x-pathname") ?? `/${locale}`;
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
          <span className="rk-util__weather">{weather ?? dict.utilityWeather}</span>
        </div>
        <div className="rk-util__right">
          <RkLocalePillsServer dict={dict} current={locale} pathname={pathname} />
          <span className="rk-util__sep" aria-hidden>
            │
          </span>
          <a
            href={withLocale(locale, "/e-paper")}
            className="rk-util__link"
          >
            {dict.utilityEpaper}
          </a>
          <span className="rk-util__sep" aria-hidden>
            │
          </span>
          <RkThemeCycle
            labels={{
              light: `☼ ${dict.rkThemeLight}`,
              dark: `☾ ${dict.rkThemeDark}`,
              sepia: `✦ ${dict.rkThemeSepia}`,
            }}
          />
          <span className="rk-util__sep" aria-hidden>
            │
          </span>
          <UtilityAuthSlot locale={locale} dict={dict} />
          <span className="rk-util__sep" aria-hidden>
            │
          </span>
          <a href="#newsletter-band" className="rk-util__sub">
            {dict.rkSubscribe}
          </a>
        </div>
      </div>
    </div>
  );
}
