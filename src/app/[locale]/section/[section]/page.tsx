import { OpinionSectionPage } from "@/components/opinion-section-page";
import { SectionPagination } from "@/components/section-pagination";
import type { Article } from "@/lib/article";
import { getSectionLabel } from "@/lib/article-display";
import { getColumnists, getSectionPage } from "@/lib/cms";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import { isKnownSectionSlug } from "@/lib/sections";
import { normalizeSlug } from "@/lib/slug";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardThumb } from "@/components/rk-cards";

type Props = {
  params: { locale: string; section: string };
  searchParams: { page?: string };
};

export const revalidate = 60;

export function generateMetadata(props: Props): Metadata {
  const section = normalizeSlug(props.params.section, "section-metadata");
  if (!isKnownSectionSlug(section) || !isLocale(props.params.locale)) {
    return { title: "Section" };
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);
  const title = getSectionLabel(section, dict.sectionLabels);
  const description =
    locale === "ur"
      ? `${title} — تازہ رپورٹیں، رائزنگ کشمیر`
      : `Latest ${title} coverage from Rising Kashmir.`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/section/${section}` },
  };
}

export default function SectionPage(props: Props) {
  const { section: raw } = props.params;
  const sp = props.searchParams;
  const section = normalizeSlug(raw, "section-page");

  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);

  if (!isKnownSectionSlug(section)) {
    notFound();
  }

  if (section === "opinion") {
    const groups = getColumnists();
    return (
      <OpinionSectionPage groups={groups} locale={locale} dict={dict} />
    );
  }

  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const { articles, totalPages, currentPage } = getSectionPage(section, page);

  const title = getSectionLabel(section, dict.sectionLabels);
  const titleFont = locale === "ur" ? "font-urdu" : "font-serif";
  const basePath = withLocale(locale, `/section/${section}`);

  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <header className="mb-8 border-b border-theme pb-6">
        <h1
          className={`text-section-title font-medium text-[var(--text-primary)] ${titleFont}`}
        >
          {title}
        </h1>
      </header>
      <ul className="flex flex-col gap-6">
        {articles.map((a: Article, i: number) => (
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
      <SectionPagination
        basePath={basePath}
        currentPage={currentPage}
        totalPages={totalPages}
        dict={dict}
      />
      <p className="mt-8 font-sans text-byline text-[var(--text-tertiary)]">
        {dict.sectionColumnistsTeaser}{" "}
        <Link
          href={withLocale(locale, "/columnists")}
          className="text-[var(--link)] hover:underline"
        >
          {dict.sectionColumnistsLink}
        </Link>
        .
      </p>
    </div>
  );
}
