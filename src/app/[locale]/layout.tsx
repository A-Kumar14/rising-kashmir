import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="rk-app">
      <SiteHeader locale={locale} dict={dict} />
      <main id="main">{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
