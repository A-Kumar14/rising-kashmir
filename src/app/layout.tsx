import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Newsreader,
  Noto_Naskh_Arabic,
  Source_Serif_4,
} from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
import { RkThemeAccent } from "@/components/rk-theme-client";
import { WebVitalsReporter } from "@/components/web-vitals";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const notoUrdu = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-urdu",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Rising Kashmir",
    template: "%s · Rising Kashmir",
  },
  description:
    "Jammu and Kashmir's prominent English daily — news from Srinagar, Jammu, India, and the world.",
  metadataBase: new URL("https://risingkashmir.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const raw = headers().get("x-locale");
  const locale: Locale =
    raw && isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ur" ? "rtl" : "ltr"}
      className={`${inter.variable} ${sourceSerif.variable} ${notoUrdu.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
      data-theme="light"
      data-serif="source"
      data-density="default"
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <Script id="rk-theme-init" strategy="beforeInteractive">
          {`(function(){try{var h=document.documentElement;var t=localStorage.getItem('rk-theme');if(t==='dark'||t==='light'||t==='sepia')h.setAttribute('data-theme',t);var s=localStorage.getItem('rk-serif');if(s==='newsreader'||s==='source')h.setAttribute('data-serif',s);var d=localStorage.getItem('rk-density');if(d==='compact'||d==='comfy'||d==='default')h.setAttribute('data-density',d);}catch(e){}})();`}
        </Script>
        <RkThemeAccent />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:border focus:border-[var(--rule-strong)] focus:bg-[var(--bg-2)] focus:px-3 focus:py-2 focus:text-[var(--ink)]"
        >
          {dict.skipToContent}
        </a>
        {children}
        <CookieConsent />
        <WebVitalsReporter />
      </body>
    </html>
  );
}
