import type { Article } from "@/lib/article";
import { columnistHref } from "@/lib/slug";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "./article-card";

export type ColumnistGroup = {
  slug: string;
  name: string;
  column: string | null;
  avatar: string | null;
  articles: Article[];
};

export function OpinionSectionPage({ groups }: { groups: ColumnistGroup[] }) {
  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <header className="mb-10 border-b border-theme pb-6">
        <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
          Opinion
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-body text-[var(--text-secondary)]">
          Columns from Srinagar, Jammu, and contributors on policy, society,
          and the region.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {groups.map((g) => (
          <section key={g.slug} aria-labelledby={`col-${g.slug}`}>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                {g.avatar ? (
                  <Image
                    src={g.avatar}
                    alt=""
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-sans text-nav text-[var(--text-tertiary)]">
                    {g.name.slice(0, 1)}
                  </div>
                )}
              </div>
              <div>
                <h2 id={`col-${g.slug}`} className="font-serif text-card-lg font-medium">
                  <Link
                    href={columnistHref(g.slug)}
                    className="text-[var(--text-primary)] hover:underline"
                  >
                    {g.name}
                  </Link>
                </h2>
                {g.column ? (
                  <p className="font-sans text-byline text-[var(--text-tertiary)]">
                    {g.column}
                  </p>
                ) : null}
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {g.articles.map((a) => (
                <li key={a.id}>
                  <ArticleCard article={a} variant="thumb" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
