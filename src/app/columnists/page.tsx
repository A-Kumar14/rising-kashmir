import { columnistHref } from "@/lib/slug";
import { getColumnists } from "@/lib/cms";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Columnists",
  description: "Opinion writers and their columns at Rising Kashmir.",
};

export default function ColumnistsIndexPage() {
  const columnists = getColumnists();

  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <header className="mb-10 border-b border-theme pb-6">
        <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
          Columnists
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-body text-[var(--text-secondary)]">
          Regular voices on politics, society, and culture — organised by writer.
        </p>
      </header>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {columnists.map((c) => (
          <li key={c.slug}>
            <Link
              href={columnistHref(c.slug)}
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
                <p className="font-serif text-card-lg font-medium text-[var(--text-primary)]">
                  {c.name}
                </p>
                {c.column ? (
                  <p className="font-sans text-byline text-[var(--text-tertiary)]">
                    {c.column}
                  </p>
                ) : null}
                <p className="mt-1 font-sans text-byline text-[var(--text-secondary)]">
                  {c.articles.length}{" "}
                  {c.articles.length === 1 ? "column" : "columns"}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
