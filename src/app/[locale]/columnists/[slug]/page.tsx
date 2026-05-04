import { CardThumb } from "@/components/rk-cards";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import { getColumnists } from "@/lib/cms";
import { normalizeSlug, sectionHref } from "@/lib/slug";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  const columnists = getColumnists();
  return locales.flatMap((locale) =>
    columnists.map((c) => ({ locale, slug: c.slug })),
  );
}

export function generateMetadata(props: Props): Metadata {
  const slug = normalizeSlug(props.params.slug, "columnist-metadata");
  const col = getColumnists().find((c) => c.slug === slug);
  if (!col || !isLocale(props.params.locale)) {
    return { title: "Columnist" };
  }
  return {
    title: col.name,
    description: col.column
      ? `${col.column} — opinion archive`
      : `Columns by ${col.name}`,
  };
}

export default function ColumnistArchivePage(props: Props) {
  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);

  const slug = normalizeSlug(props.params.slug, "columnist-page");
  const col = getColumnists().find((c) => c.slug === slug);
  if (!col) notFound();

  const titleFont = locale === "ur" ? "font-urdu" : "font-serif";

  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <nav className="mb-6 font-sans text-byline text-[var(--text-tertiary)]">
        <Link
          href={withLocale(locale, "/columnists")}
          className="text-[var(--link)] hover:underline"
        >
          {dict.footerColumnists}
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
            <div
              className={`flex h-full w-full items-center justify-center text-section-title text-[var(--text-tertiary)] ${titleFont}`}
            >
              {col.name.slice(0, 1)}
            </div>
          )}
        </div>
        <div>
          <h1
            className={`text-section-title font-medium text-[var(--text-primary)] ${titleFont}`}
          >
            {col.name}
          </h1>
          {col.column ? (
            <p className="mt-2 font-sans text-body text-[var(--text-secondary)]">
              {col.column}
            </p>
          ) : null}
          <p className="mt-2 font-sans text-byline text-[var(--text-tertiary)]">
            <Link
              href={sectionHref(locale, "opinion")}
              className="text-[var(--link)] hover:underline"
            >
              {dict.sectionLabels.opinion}
            </Link>
          </p>
        </div>
      </header>

      <ul className="flex flex-col gap-6">
        {col.articles.map((a, i) => (
          <li key={a.id}>
            <CardThumb
              article={a}
              locale={locale}
              dict={dict}
              idx={i}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
