import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { Masthead } from "./masthead";
import { PrimaryNav } from "./primary-nav";
import { UtilityBar } from "./utility-bar";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: UiDictionary;
}) {
  return (
    <>
      <UtilityBar locale={locale} dict={dict} />
      <Masthead locale={locale} dict={dict} />
      <PrimaryNav locale={locale} dict={dict} />
    </>
  );
}
