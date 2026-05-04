import type { Article } from "@/lib/article";
import {
  getArticleDek,
  getArticleTitle,
  getSectionLabel,
} from "@/lib/article-display";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { getAuthorName } from "@/lib/byline";
import { rkRelTime } from "@/lib/rk-time";
import { articleHref } from "@/lib/slug";
import Image from "next/image";
import Link from "next/link";

type Ratio = "16x10" | "4x3" | "3x4" | "1x1" | "16x9";

export function RkArticleImage({
  article,
  ratio,
  priority,
}: {
  article: Article;
  ratio: Ratio;
  priority?: boolean;
}) {
  const cls = `rk-img rk-img--${ratio}`;
  if (!article.hero_image) {
    return <div className={cls} />;
  }
  return (
    <div className={cls}>
      <Image
        src={article.hero_image.url}
        alt={article.hero_image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 700px) 100vw, 55vw"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
      />
    </div>
  );
}

function sectionEyebrow(
  article: Article,
  locale: Locale,
  dict: UiDictionary,
): string {
  const s = getSectionLabel(article.section, dict.sectionLabels);
  return locale === "en" ? s.toUpperCase() : s;
}

export function CardLead({
  article,
  locale,
  dict,
}: {
  article: Article;
  locale: Locale;
  dict: UiDictionary;
}) {
  const href = articleHref(locale, article.slug);
  const title = getArticleTitle(article, locale);
  const dek = getArticleDek(article, locale);
  const by = getAuthorName(article);
  const titleClass =
    locale === "ur" ? "rk-lead__title is-urdu" : "rk-lead__title";

  return (
    <article className="rk-lead">
      <Link href={href} className="rk-lead__media">
        <RkArticleImage article={article} ratio="16x10" priority />
      </Link>
      <div className="rk-lead__body">
        <div className="rk-eyebrow rk-eyebrow--accent">
          <span>{sectionEyebrow(article, locale, dict)}</span>
          <span className="rk-eyebrow__dot" aria-hidden>
            ●
          </span>
          <span>{rkRelTime(article.published_at, locale)}</span>
        </div>
        <Link href={href} className={titleClass}>
          {title}
        </Link>
        {dek ? <p className="rk-lead__dek">{dek}</p> : null}
        <p className="rk-byline">
          <span className="rk-byline__by">{dict.rkBy}</span>{" "}
          <span className="rk-byline__name">{by}</span>
          <span className="rk-byline__sep">·</span>
          <span>
            {article.reading_time_minutes} {dict.articleMinRead}
          </span>
        </p>
      </div>
    </article>
  );
}

export function CardSecondary({
  article,
  locale,
  dict,
}: {
  article: Article;
  locale: Locale;
  dict: UiDictionary;
}) {
  const href = articleHref(locale, article.slug);
  const title = getArticleTitle(article, locale);
  const by = getAuthorName(article);
  const titleClass =
    locale === "ur" ? "rk-secondary__title is-urdu" : "rk-secondary__title";

  return (
    <article className="rk-secondary">
      <div className="rk-eyebrow">{sectionEyebrow(article, locale, dict)}</div>
      <Link href={href} className={titleClass}>
        {title}
      </Link>
      <p className="rk-byline">
        <span className="rk-byline__name">{by}</span>
        <span className="rk-byline__sep">·</span>
        <span>{rkRelTime(article.published_at, locale)}</span>
      </p>
    </article>
  );
}

export function CardTile({
  article,
  locale,
  dict,
}: {
  article: Article;
  locale: Locale;
  dict: UiDictionary;
}) {
  const href = articleHref(locale, article.slug);
  const title = getArticleTitle(article, locale);
  const by = getAuthorName(article);
  const titleClass =
    locale === "ur" ? "rk-tile__title is-urdu" : "rk-tile__title";

  return (
    <article className="rk-tile">
      <Link href={href} className="rk-tile__media">
        <RkArticleImage article={article} ratio="4x3" />
      </Link>
      <div className="rk-eyebrow">{sectionEyebrow(article, locale, dict)}</div>
      <Link href={href} className={titleClass}>
        {title}
      </Link>
      <p className="rk-byline">
        <span className="rk-byline__name">{by}</span>
        <span className="rk-byline__sep">·</span>
        <span>{rkRelTime(article.published_at, locale)}</span>
      </p>
    </article>
  );
}

export function CardThumb({
  article,
  locale,
  dict,
  idx,
}: {
  article: Article;
  locale: Locale;
  dict: UiDictionary;
  idx: number;
}) {
  const href = articleHref(locale, article.slug);
  const title = getArticleTitle(article, locale);
  const by = getAuthorName(article);
  const titleClass =
    locale === "ur" ? "rk-thumb__title is-urdu" : "rk-thumb__title";

  return (
    <article className="rk-thumb">
      <span className="rk-thumb__num">{String(idx + 1).padStart(2, "0")}</span>
      <Link href={href} className="rk-thumb__media">
        <RkArticleImage article={article} ratio="1x1" />
      </Link>
      <div className="rk-thumb__body">
        <div className="rk-eyebrow">{sectionEyebrow(article, locale, dict)}</div>
        <Link href={href} className={titleClass}>
          {title}
        </Link>
        <p className="rk-byline">
          <span className="rk-byline__name">{by}</span>
          <span className="rk-byline__sep">·</span>
          <span>{rkRelTime(article.published_at, locale)}</span>
        </p>
      </div>
    </article>
  );
}
