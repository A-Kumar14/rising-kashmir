import type { Article } from "@/lib/article";
import { getArticleDek, getArticleTitle } from "@/lib/article-display";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { formatPublished, getAuthorName } from "@/lib/byline";
import { articleHref, sectionHref } from "@/lib/slug";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

const cardVariants = cva(
  "group block border-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--link)]",
  {
    variants: {
      variant: {
        hero: "border-0",
        secondary: "border-0",
        thumb:
          "flex gap-3 border-b border-theme pb-4 last:border-0 last:pb-0 md:border-0 md:pb-0",
        compact: "border-b border-theme pb-3 last:border-0",
        tile: "border-0",
      },
    },
    defaultVariants: {
      variant: "compact",
    },
  },
);

export type ArticleCardProps = {
  article: Article;
  locale: Locale;
  dict: UiDictionary;
} & VariantProps<typeof cardVariants>;

export function ArticleCard({
  article,
  locale,
  dict,
  variant = "compact",
}: ArticleCardProps) {
  const href = articleHref(locale, article.slug);
  const byline = getAuthorName(article);
  const time = formatPublished(article.published_at, locale);
  const sectionLink = sectionHref(locale, article.section);
  const title = getArticleTitle(article, locale);
  const dek = getArticleDek(article, locale);
  const sectionLabel =
    dict.sectionLabels[article.section] ?? article.section;
  const eyebrow =
    locale === "en"
      ? "font-sans text-eyebrow font-medium uppercase tracking-[1px]"
      : "font-sans text-eyebrow font-medium";
  const tf = locale === "ur" ? "font-urdu" : "font-serif";

  if (variant === "tile") {
    return (
      <article className={`group ${cardVariants({ variant: "tile" })}`}>
        <Link
          href={href}
          className="relative mb-3 block aspect-[4/3] w-full overflow-hidden bg-[var(--bg-tertiary)]"
        >
          {article.hero_image ? (
            <Image
              src={article.hero_image.url}
              alt={article.hero_image.alt}
              fill
              className="object-cover transition-transform duration-180 group-hover:scale-[1.01]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-[var(--bg-tertiary)]" />
          )}
        </Link>
        <Link
          href={sectionLink}
          className={`mb-1 inline-block text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] ${eyebrow}`}
        >
          {sectionLabel}
        </Link>
        <Link href={href}>
          <h3
            className={`${tf} text-card-lg font-medium text-[var(--text-primary)] group-hover:underline`}
          >
            {title}
          </h3>
        </Link>
        <p className="mt-2 font-sans text-byline text-[var(--text-tertiary)]">
          {byline} · {time}
        </p>
      </article>
    );
  }

  if (variant === "hero") {
    return (
      <article className={cardVariants({ variant })}>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-8">
          <Link href={href} className="block overflow-hidden">
            {article.hero_image ? (
              <div className="relative aspect-[16/10] w-full bg-[var(--bg-tertiary)]">
                <Image
                  src={article.hero_image.url}
                  alt={article.hero_image.alt}
                  fill
                  className="object-cover transition-transform duration-180 group-hover:scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 900px"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-[16/10] w-full bg-[var(--bg-tertiary)]" />
            )}
          </Link>
          <div className="flex flex-col gap-3">
            <Link
              href={sectionLink}
              className={`text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] ${eyebrow}`}
            >
              {sectionLabel}
            </Link>
            <Link href={href}>
              <h2
                className={`${tf} text-hero font-medium text-[var(--text-primary)] group-hover:underline`}
              >
                {title}
              </h2>
            </Link>
            {dek ? (
              <p className="font-sans text-dek text-[var(--text-secondary)]">
                {dek}
              </p>
            ) : null}
            <p className="font-sans text-byline text-[var(--text-tertiary)]">
              {byline} · {time}
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "secondary") {
    return (
      <article className={cardVariants({ variant })}>
        <div className="flex flex-col gap-2">
          <Link
            href={sectionLink}
            className={`text-[var(--text-tertiary)] ${eyebrow}`}
          >
            {sectionLabel}
          </Link>
          <Link href={href}>
            <h3
              className={`${tf} text-card-lg font-medium text-[var(--text-primary)] group-hover:underline`}
            >
              {title}
            </h3>
          </Link>
          <p className="font-sans text-byline text-[var(--text-tertiary)]">
            {byline} · {time}
          </p>
        </div>
      </article>
    );
  }

  if (variant === "thumb") {
    return (
      <article className={cardVariants({ variant })}>
        <Link
          href={href}
          className="relative h-20 w-28 shrink-0 overflow-hidden bg-[var(--bg-tertiary)]"
        >
          {article.hero_image ? (
            <Image
              src={article.hero_image.url}
              alt={article.hero_image.alt}
              fill
              className="object-cover"
              sizes="112px"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-[var(--bg-tertiary)]" />
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={href}>
            <h3
              className={`${tf} text-card-md font-medium text-[var(--text-primary)] group-hover:underline`}
            >
              {title}
            </h3>
          </Link>
          <p className="mt-1 font-sans text-byline text-[var(--text-tertiary)]">
            {byline} · {time}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className={cardVariants({ variant: "compact" })}>
      <div className="flex gap-3">
        <Link
          href={href}
          className="relative h-16 w-24 shrink-0 overflow-hidden bg-[var(--bg-tertiary)]"
        >
          {article.hero_image ? (
            <Image
              src={article.hero_image.url}
              alt={article.hero_image.alt}
              fill
              className="object-cover"
              sizes="96px"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-[var(--bg-tertiary)]" />
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={href}>
            <h3
              className={`${tf} text-card-md font-medium text-[var(--text-primary)] line-clamp-3 group-hover:underline`}
            >
              {title}
            </h3>
          </Link>
          <p className="mt-1 font-sans text-byline text-[var(--text-tertiary)]">
            {byline} · {time}
          </p>
        </div>
      </div>
    </article>
  );
}
