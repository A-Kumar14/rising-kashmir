import type { Article } from "@/lib/article";
import { sectionHref } from "@/lib/slug";
import Link from "next/link";
import { ArticleCard } from "./article-card";

type Layout = "four-up" | "list";

type Props = {
  title: string;
  sectionSlug: string;
  articles: Article[];
  layout: Layout;
  /** When true, omit outer max-width container (use inside a grid). */
  embedded?: boolean;
};

export function SectionStrip({
  title,
  sectionSlug,
  articles,
  layout,
  embedded = false,
}: Props) {
  if (articles.length === 0) return null;
  const more = sectionHref(sectionSlug);

  const inner = embedded
    ? "px-0"
    : "mx-auto max-w-container px-4 md:px-6";

  return (
    <section className="border-b border-theme bg-[var(--bg-primary)] py-8">
      <div className={inner}>
        <div className="mb-4 flex items-baseline justify-between border-b border-theme pb-2">
          <h2 className="font-serif text-strip-header font-medium text-[var(--text-primary)]">
            {title}
          </h2>
          <Link
            href={more}
            className="shrink-0 font-sans text-nav font-medium text-[var(--link)] hover:underline"
          >
            More →
          </Link>
        </div>

        {layout === "four-up" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {articles.map((a) => (
              <div key={a.id} className="border border-theme p-3">
                <ArticleCard article={a} variant="tile" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {articles.map((a) => (
              <li key={a.id}>
                <ArticleCard article={a} variant="thumb" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
