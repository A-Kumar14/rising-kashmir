import { OpinionSectionPage } from "@/components/opinion-section-page";
import { SectionPagination } from "@/components/section-pagination";
import type { Article } from "@/lib/article";
import {
  getColumnists,
  getSectionPage,
} from "@/lib/cms";
import { formatSectionLabel } from "@/lib/sections-label";
import { isKnownSectionSlug } from "@/lib/sections";
import { normalizeSlug } from "@/lib/slug";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";

type Props = {
  params: { section: string };
  searchParams: { page?: string };
};

export const revalidate = 60;

export function generateMetadata(props: Props): Metadata {
  const { section: raw } = props.params;
  const section = normalizeSlug(raw);
  if (!isKnownSectionSlug(section)) return { title: "Section" };
  const title =
    section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ");
  return {
    title,
    description: `Latest ${title} coverage from Rising Kashmir.`,
    alternates: { canonical: `/section/${section}` },
  };
}

export default function SectionPage(props: Props) {
  const { section: raw } = props.params;
  const sp = props.searchParams;
  const section = normalizeSlug(raw);

  if (!isKnownSectionSlug(section)) {
    notFound();
  }

  if (section === "opinion") {
    const groups = getColumnists();
    return <OpinionSectionPage groups={groups} />;
  }

  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const { articles, totalPages, currentPage } = getSectionPage(section, page);

  const title = formatSectionLabel(section);

  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <header className="mb-8 border-b border-theme pb-6">
        <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
          {title}
        </h1>
      </header>
      <ul className="flex flex-col gap-6">
        {articles.map((a: Article) => (
          <li key={a.id}>
            <ArticleCard article={a} variant="thumb" />
          </li>
        ))}
      </ul>
      <SectionPagination
        basePath={`/section/${section}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <p className="mt-8 font-sans text-byline text-[var(--text-tertiary)]">
        Looking for columnists?{" "}
        <Link href="/columnists" className="text-[var(--link)] hover:underline">
          Browse the columnist index
        </Link>
        .
      </p>
    </div>
  );
}
