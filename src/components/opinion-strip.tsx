import type { Article } from "@/lib/article";
import { articleHref, columnistHref } from "@/lib/slug";
import Image from "next/image";
import Link from "next/link";

type Props = { columnists: Article[] };

export function OpinionStrip({ columnists }: Props) {
  if (columnists.length === 0) return null;

  return (
    <section
      className="border-b border-theme bg-[var(--bg-secondary)] py-8"
      aria-label="Opinion"
    >
      <div className="mx-auto max-w-container px-4 md:px-6">
        <h2 className="mb-6 font-serif text-section-title font-medium text-[var(--text-primary)]">
          Opinion
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {columnists.map((a) => {
            const col = a.author;
            if (!col) return null;
            return (
              <article
                key={a.id}
                className="flex flex-col border border-theme bg-[var(--bg-primary)] p-4"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                    {col.avatar ? (
                      <Image
                        src={col.avatar}
                        alt=""
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center font-sans text-byline text-[var(--text-tertiary)]"
                        aria-hidden
                      >
                        {col.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={columnistHref(col.slug)}
                      className="block truncate font-sans text-nav font-medium text-[var(--text-primary)] hover:underline"
                    >
                      {col.name}
                    </Link>
                    {col.column ? (
                      <p className="truncate font-sans text-byline text-[var(--text-tertiary)]">
                        {col.column}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Link href={articleHref(a.slug)} className="group">
                  <h3 className="mb-2 font-serif text-card-lg font-medium text-[var(--text-primary)] group-hover:underline">
                    {a.title}
                  </h3>
                  {a.dek ? (
                    <p className="line-clamp-2 font-sans text-dek text-[var(--text-secondary)]">
                      {a.dek}
                    </p>
                  ) : null}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
