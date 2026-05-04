import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { WebVitalsReporter } from "@/components/web-vitals";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "500"],
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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-primary)]">
        <Script id="rk-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('rk-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:border focus:border-theme focus:bg-[var(--bg-secondary)] focus:px-3 focus:py-2 focus:text-[var(--text-primary)]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <WebVitalsReporter />
      </body>
    </html>
  );
}
