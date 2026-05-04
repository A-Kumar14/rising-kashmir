import { AdSlot } from "@/components/ad-slot";
import { BreakingBanner } from "@/components/breaking-banner";
import { Hero, type HeroVariant } from "@/components/hero";
import { NewsletterBand } from "@/components/newsletter-band";
import { OpinionStrip } from "@/components/opinion-strip";
import { SectionStrip } from "@/components/section-strip";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import {
  articles,
  getBreakingArticles,
  getBySection,
  getHomeSecondary,
  getLeadStory,
  getOpinionFeatured,
} from "@/lib/cms";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardThumb } from "@/components/rk-cards";
import { getArticleTitle } from "@/lib/article-display";
import Link from "next/link";

type Props = {
  params: { locale: string };
  searchParams?: { hero?: string; q?: string };
};

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) {
    return { title: "Rising Kashmir" };
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);
  return {
    title: dict.homeTitle,
    description: dict.homeDescription,
  };
}

function filterArticles(q: string, locale: Locale) {
  const n = q.trim().toLowerCase();
  if (n.length < 2) return [];
  return articles.filter((a) => {
    const t = getArticleTitle(a, locale).toLowerCase();
    const dek = (a.dek ?? "").toLowerCase();
    const auth = (a.author?.name ?? "").toLowerCase();
    return (
      t.includes(n) ||
      dek.includes(n) ||
      auth.includes(n) ||
      a.section.includes(n)
    );
  });
}

export default function HomePage(props: Props) {
  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);

  const q = (props.searchParams?.q ?? "").trim();
  if (q.length > 1) {
    const results = filterArticles(q, locale);
    return (
      <div className="rk-search">
        <header className="rk-sectionpage__head">
          <p className="rk-sectionpage__kicker">— SEARCH</p>
          <h1 className="rk-sectionpage__title">&ldquo;{q}&rdquo;</h1>
          <p className="rk-sectionpage__count">
            {results.length}{" "}
            {results.length === 1 ? "result" : "results"}
          </p>
        </header>
        {results.length === 0 ? (
          <p className="rk-empty">No stories matched that query.</p>
        ) : (
          <ul className="rk-strip__list">
            {results.map((a, i) => (
              <li key={a.id}>
                <CardThumb article={a} locale={locale} dict={dict} idx={i} />
              </li>
            ))}
          </ul>
        )}
        <p className="rk-sectionpage__count" style={{ marginTop: "24px" }}>
          <Link href={`/${locale}`} className="rk-article__back">
            {dict.rkBackToFront}
          </Link>
        </p>
      </div>
    );
  }

  const rawHero = props.searchParams?.hero ?? "";
  const variant: HeroVariant =
    rawHero === "magazine" || rawHero === "wire" ? rawHero : "editorial";

  const lead = getLeadStory();
  const secondaries = getHomeSecondary();
  const breaking = getBreakingArticles();
  const opinion = getOpinionFeatured();
  const kashmir = getBySection("kashmir", 4);
  const sports = getBySection("sports", 3);
  const world = getBySection("world", 3);

  return (
    <>
      <BreakingBanner articles={breaking} locale={locale} dict={dict} />
      <Hero
        lead={lead}
        secondaries={secondaries}
        locale={locale}
        dict={dict}
        variant={variant}
      />
      <OpinionStrip columnists={opinion} locale={locale} dict={dict} />
      <AdSlot name="home-mid-1" />
      <SectionStrip
        title={dict.sectionLabels.kashmir}
        sectionSlug="kashmir"
        articles={kashmir}
        layout="four-up"
        locale={locale}
        dict={dict}
      />
      <div className="rk-home-dual">
        <SectionStrip
          embedded
          title={dict.sectionLabels.sports}
          sectionSlug="sports"
          articles={sports}
          layout="list"
          locale={locale}
          dict={dict}
        />
        <SectionStrip
          embedded
          title={dict.sectionLabels.world}
          sectionSlug="world"
          articles={world}
          layout="list"
          locale={locale}
          dict={dict}
        />
      </div>
      <NewsletterBand dict={dict} />
    </>
  );
}
