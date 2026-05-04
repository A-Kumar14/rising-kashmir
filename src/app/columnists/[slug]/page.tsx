import { ArticleCard } from "@/components/article-card";
import { getColumnists } from "@/lib/mock-articles";
import { columnistHref, normalizeSlug } from "@/lib/slug";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getColumnists().map((c) => ({ slug: c.slug }));
}

export function generateMetadata(props: Props): Metadata {
  const { slug: raw } = props.params;
  const slug = normalizeSlug(raw);
  const col = getColumnists().find((c) => c.slug === slug);
  if (!col) return { title: "Columnist" };
  return {
    title: col.name,
    description: col.column
      ? `${col.column} — opinion archive`
      : `Columns by ${col.name}`,
  };
}

export default function ColumnistArchivePage(props: Props) {
  const { slug: raw } = props.params;
  const slug = normalizeSlug(raw);
  const col = getColumnists().find((c) => c.slug === slug);
  if (!col) notFound();

  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <nav className="mb-6 font-sans text-byline text-[var(--text-tertiary)]">
        <Link href="/columnists" className="text-[var(--link)] hover:underline">
          Columnists
        </Link>
      </nav>

      <header className="mb-10 flex flex-wrap items-start gap-6 border-b border-theme pb-8">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
          {col.avatar ? (
            <Image
              src={col.avatar}
              alt=""
              width={80}
              height={80}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-section-title text-[var(--text-tertiary)]">
              {col.name.slice(0, 1)}
            </div>
          )}
        </div>
        <div>
          <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
            {col.name}
          </h1>
          {col.column ? (
            <p className="mt-2 font-sans text-body text-[var(--text-secondary)]">
              {col.column}
            </p>
          ) : null}
          <p className="mt-2 font-sans text-byline text-[var(--text-tertiary)]">
            <Link href="/section/opinion" className="text-[var(--link)] hover:underline">
              Opinion
            </Link>
          </p>
        </div>
      </header>

      <ul className="flex flex-col gap-6">
        {col.articles.map((a) => (
          <li key={a.id}>
            <ArticleCard article={a} variant="thumb" />
          </li>
        ))}
      </ul>
    </div>
  );
}
