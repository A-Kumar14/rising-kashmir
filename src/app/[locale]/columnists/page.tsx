import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { columnistHref } from "@/lib/slug";
import { getColumnists } from "@/lib/cms";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { locale: string } };

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) {
    return { title: "Columnists" };
  }
  const dict = getDictionary(props.params.locale as Locale);
  return {
    title: dict.footerColumnists,
    description: dict.columnistsMetaDescription,
  };
}

export default function ColumnistsIndexPage(props: Props) {
  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);
  const columnists = getColumnists();

  const titleFont = locale === "ur" ? "font-urdu" : "font-serif";

  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <header className="mb-10 border-b border-theme pb-6">
        <h1
          className={`text-section-title font-medium text-[var(--text-primary)] ${titleFont}`}
        >
          {dict.footerColumnists}
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-body text-[var(--text-secondary)]">
          {dict.columnistsIntro}
        </p>
      </header>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {columnists.map((c) => (
          <li key={c.slug}>
            <Link
              href={columnistHref(locale, c.slug)}
              className="flex gap-4 border border-theme bg-[var(--bg-secondary)] p-4 transition-opacity duration-120 hover:opacity-90"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                {c.avatar ? (
                  <Image
                    src={c.avatar}
                    alt=""
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-sans text-nav text-[var(--text-tertiary)]">
                    {c.name.slice(0, 1)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-card-lg font-medium text-[var(--text-primary)] ${titleFont}`}
                >
                  {c.name}
                </p>
                {c.column ? (
                  <p className="font-sans text-byline text-[var(--text-tertiary)]">
                    {c.column}
                  </p>
                ) : null}
                <p className="mt-1 font-sans text-byline text-[var(--text-secondary)]">
                  {c.articles.length}{" "}
                  {c.articles.length === 1
                    ? dict.columnCountOne
                    : dict.columnCountMany}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
