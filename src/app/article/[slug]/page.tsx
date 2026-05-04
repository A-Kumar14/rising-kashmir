import { AdSlot } from "@/components/ad-slot";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/article";
import { formatPublished, getAuthorName } from "@/lib/byline";
import { articles, getArticleBySlug } from "@/lib/cms";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { formatSectionLabel } from "@/lib/sections-label";
import { normalizeSlug, sectionHref } from "@/lib/slug";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export const revalidate = 60;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata(props: Props): Metadata {
  const article = getArticleBySlug(normalizeSlug(props.params.slug));
  if (!article) return { title: "Not found" };
  const path = `/article/${article.slug}`;
  return {
    title: article.title,
    description: article.dek ?? article.title,
    alternates: { canonical: path },
    openGraph: {
      title: article.title,
      description: article.dek ?? undefined,
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

export default function ArticlePage(props: Props) {
  const { slug: raw } = props.params;
  const slug = normalizeSlug(raw);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const html = sanitizeArticleHtml(article.body);
  const byline = getAuthorName(article);
  const sectionLink = sectionHref(article.section);
  const related = relatedStories(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: byline },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-container px-4 py-10 md:px-6">
        <nav className="mb-6 font-sans text-byline text-[var(--text-tertiary)]">
          <Link href="/" className="text-[var(--link)] hover:underline">
            Home
          </Link>
          <span aria-hidden> · </span>
          <Link href={sectionLink} className="text-[var(--link)] hover:underline">
            {formatSectionLabel(article.section)}
          </Link>
        </nav>

        <header className="mb-8 max-w-3xl">
          <Link
            href={sectionLink}
            className="mb-3 inline-block font-sans text-eyebrow font-medium uppercase tracking-[1px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
          >
            {formatSectionLabel(article.section)}
          </Link>
          <h1 className="font-serif text-hero font-medium text-[var(--text-primary)]">
            {article.title}
          </h1>
          {article.dek ? (
            <p className="mt-4 font-sans text-dek text-[var(--text-secondary)]">
              {article.dek}
            </p>
          ) : null}
          <p className="mt-4 font-sans text-byline text-[var(--text-tertiary)]">
            {byline} · {formatPublished(article.published_at)} ·{" "}
            {article.reading_time_minutes} min read
          </p>
        </header>

        {article.hero_image ? (
          <figure className="mb-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-tertiary)]">
              <Image
                src={article.hero_image.url}
                alt={article.hero_image.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
            <figcaption className="mt-2 font-sans text-byline text-[var(--text-tertiary)]">
              {article.hero_image.credit}
            </figcaption>
          </figure>
        ) : null}

        <AdSlot name="article-inline-1" />

        <div
          className="article-body max-w-3xl space-y-4 font-sans text-body text-[var(--text-primary)] [&_a]:text-[var(--link)] [&_a]:underline [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-card-lg [&_h2]:font-medium [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {related.length > 0 ? (
          <aside className="mt-14 border-t border-theme pt-10">
            <h2 className="mb-6 font-serif text-strip-header font-medium text-[var(--text-primary)]">
              Related
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} variant="thumb" />
              ))}
            </div>
          </aside>
        ) : null}
      </article>
    </>
  );
}
