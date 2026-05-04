import type { Article } from "@/lib/article";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { columnistHref } from "@/lib/slug";
import Image from "next/image";
import Link from "next/link";
import { CardThumb } from "./rk-cards";

export type ColumnistGroup = {
  slug: string;
  name: string;
  column: string | null;
  avatar: string | null;
  articles: Article[];
};

type Props = {
  groups: ColumnistGroup[];
  locale: Locale;
  dict: UiDictionary;
};

export function OpinionSectionPage({ groups, locale, dict }: Props) {
  const titleFont = locale === "ur" ? "font-urdu" : "font-serif";

  return (
    <div className="mx-auto max-w-container px-4 py-10 md:px-6">
      <header className="mb-10 border-b border-theme pb-6">
        <h1
          className={`text-section-title font-medium text-[var(--text-primary)] ${titleFont}`}
        >
          {dict.sectionLabels.opinion}
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-body text-[var(--text-secondary)]">
          {dict.opinionSectionIntro}
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
                <h2
                  id={`col-${g.slug}`}
                  className={`text-card-lg font-medium ${titleFont}`}
                >
                  <Link
                    href={columnistHref(locale, g.slug)}
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
              {g.articles.map((a, i) => (
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
          </section>
        ))}
      </div>
    </div>
  );
}
