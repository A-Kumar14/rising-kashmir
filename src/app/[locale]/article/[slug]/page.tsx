import { AdSlot } from "@/components/ad-slot";
import type { Article } from "@/lib/article";
import {
  getArticleBody,
  getArticleDek,
  getArticleTitle,
  getSectionLabel,
} from "@/lib/article-display";
import { CardTile } from "@/components/rk-cards";
import { formatPublished, getAuthorName } from "@/lib/byline";
import { articles, getArticleBySlug } from "@/lib/cms";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { rkRelTime } from "@/lib/rk-time";
import { withLocale } from "@/i18n/path";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { articleHref, normalizeSlug, sectionHref } from "@/lib/slug";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { locale: string; slug: string } };

export const revalidate = 60;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export function generateMetadata(props: Props): Metadata {
  const slug = normalizeSlug(props.params.slug, "article-metadata");
  const article = getArticleBySlug(slug);
  if (!article || !isLocale(props.params.locale)) {
    return { title: "Not found" };
  }
  const locale = props.params.locale as Locale;
  const title = getArticleTitle(article, locale);
  const dek = getArticleDek(article, locale);
  const path = `/${locale}/article/${article.slug}`;
  return {
    title,
    description: dek ?? title,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: dek ?? undefined,
      type: "article",
      url: path,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
    },
  };
}

function relatedStories(current: Article): Article[] {
  return articles
    .filter(
      (a) =>
        a.id !== current.id &&
        (a.section === current.section ||
          a.tags.some((t) => current.tags.includes(t))),
    )
    .slice(0, 4);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function storyBullets(dek: string | null): string[] {
  if (!dek) return [];
  return dek
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8)
    .slice(0, 3);
}

export default function ArticlePage(props: Props) {
  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);

  const slug = normalizeSlug(props.params.slug, "article-page");
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const rawBody = getArticleBody(article, locale);
  const html = sanitizeArticleHtml(rawBody);
  const by = article.author?.name ?? getAuthorName(article);
  const sectionLink = sectionHref(locale, article.section);
  const related = relatedStories(article);
  const title = getArticleTitle(article, locale);
  const dek = getArticleDek(article, locale);
  const sectionLabel = getSectionLabel(article.section, dict.sectionLabels);
  const eyebrow =
    locale === "en" ? sectionLabel.toUpperCase() : sectionLabel;
  const titleClass =
    locale === "ur" ? "rk-article__title is-urdu" : "rk-article__title";
  const dateLine = formatPublished(article.published_at, locale);
  const bullets = storyBullets(dek);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: by },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="rk-article">
        <Link href={withLocale(locale, "/")} className="rk-article__back">
          {dict.rkBackToFront}
        </Link>

        <div className="rk-article__head">
          <div className="rk-eyebrow rk-eyebrow--accent">
            <span>{eyebrow}</span>
            <span className="rk-eyebrow__dot" aria-hidden>
              ●
            </span>
            <span>{dateLine}</span>
          </div>
          <h1 className={titleClass}>{title}</h1>
          {dek ? <p className="rk-article__dek">{dek}</p> : null}
          <div className="rk-article__byline">
            <div className="rk-col__avatar">{initials(by)}</div>
            <div>
              <p className="rk-article__author">
                {dict.rkBy} {by}
              </p>
              <p className="rk-article__meta">
                {rkRelTime(article.published_at, locale)} ·{" "}
                {article.reading_time_minutes} {dict.articleMinRead}
              </p>
            </div>
            <div className="rk-article__tools">
              <button type="button" title="Save">
                ☆
              </button>
              <button type="button" title="Share">
                ⤴
              </button>
              <button type="button" title="Listen">
                ▷
              </button>
              <button type="button" title="Print">
                ⎙
              </button>
            </div>
          </div>
        </div>

        {article.hero_image ? (
          <figure className="rk-article__hero">
            <div className="rk-img rk-img--16x9">
              <Image
                src={article.hero_image.url}
                alt={article.hero_image.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1180px"
              />
            </div>
            <figcaption className="rk-byline" style={{ marginTop: "8px" }}>
              {article.hero_image.credit}
            </figcaption>
          </figure>
        ) : null}

        <AdSlot name="article-inline-1" />

        <div className="rk-article__body">
          <aside className="rk-article__rail">
            <p className="rk-article__rail-h">{dict.rkArticleInThisStory}</p>
            <ul>
              {bullets.length > 0
                ? bullets.map((b) => <li key={b.slice(0, 24)}>{b}</li>)
                : null}
            </ul>
            {related.length > 0 ? (
              <>
                <p className="rk-article__rail-h rk-article__rail-h--mt">
                  {dict.relatedHeading}
                </p>
                <ul className="rk-article__related">
                  {related.slice(0, 4).map((r) => (
                    <li key={r.id}>
                      <Link href={articleHref(locale, r.slug)}>
                        {getArticleTitle(r, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </aside>
          <div
            className="rk-article__text article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {related.length > 0 ? (
          <div className="rk-article__more">
            <h3 className="rk-strip__title">
              <span className="rk-strip__num" aria-hidden>
                →
              </span>{" "}
              {dict.relatedHeading} · {sectionLabel}
            </h3>
            <div className="rk-strip__grid">
              {related.map((r) => (
                <CardTile key={r.id} article={r} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </>
  );
}
