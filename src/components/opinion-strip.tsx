import type { Article } from "@/lib/article";
import { getArticleDek, getArticleTitle } from "@/lib/article-display";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { rkRelTime } from "@/lib/rk-time";
import { articleHref, columnistHref } from "@/lib/slug";
import Link from "next/link";

type Props = {
  columnists: Article[];
  locale: Locale;
  dict: UiDictionary;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

export function OpinionStrip({ columnists, locale, dict }: Props) {
  if (columnists.length === 0) return null;

  const titleClass =
    locale === "ur" ? "rk-opinion__title is-urdu" : "rk-opinion__title";

  return (
    <section className="rk-opinion" aria-label={dict.opinionHeading}>
      <div className="rk-opinion__inner">
        <header className="rk-opinion__head">
          <div>
            <p className="rk-opinion__kicker">— {dict.rkOpinionColumnKicker}</p>
            <h2 className={titleClass}>{dict.opinionHeading}</h2>
          </div>
          <p className="rk-opinion__sub">{dict.rkOpinionStripSub}</p>
        </header>
        <div className="rk-opinion__grid">
          {columnists.map((a, i) => {
            const col = a.author;
            if (!col) return null;
            const tClass =
              locale === "ur" ? "rk-col__title is-urdu" : "rk-col__title";
            const title = getArticleTitle(a, locale);
            const dek = getArticleDek(a, locale);
            const quote =
              locale === "ur" ? `«${title}»` : `“${title}”`;

            return (
              <article key={a.id} className="rk-col">
                <span className="rk-col__num">
                  № {String(i + 1).padStart(2, "0")}
                </span>
                <p className="rk-col__column">
                  {col.column ?? dict.sectionLabels.opinion}
                </p>
                <Link href={articleHref(locale, a.slug)} className={tClass}>
                  {quote}
                </Link>
                {dek ? <p className="rk-col__dek">{dek}</p> : null}
                <div className="rk-col__author">
                  <div className="rk-col__avatar">{initials(col.name)}</div>
                  <div>
                    <p className="rk-col__name">
                      <Link href={columnistHref(locale, col.slug)} className="rk-col__name-link">
                        {col.name}
                      </Link>
                    </p>
                    <p className="rk-col__meta">
                      {rkRelTime(a.published_at, locale)} ·{" "}
                      {a.reading_time_minutes} {dict.articleMinRead}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
