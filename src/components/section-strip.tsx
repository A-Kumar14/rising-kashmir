import type { Article } from "@/lib/article";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { sectionHref } from "@/lib/slug";
import Link from "next/link";
import { CardThumb, CardTile } from "./rk-cards";

type Layout = "four-up" | "list";

type Props = {
  title: string;
  sectionSlug: string;
  articles: Article[];
  layout: Layout;
  embedded?: boolean;
  locale: Locale;
  dict: UiDictionary;
};

export function SectionStrip({
  title,
  sectionSlug,
  articles,
  layout,
  embedded = false,
  locale,
  dict,
}: Props) {
  if (articles.length === 0) return null;
  const more = sectionHref(locale, sectionSlug);
  const moreLabel =
    locale === "ur" ? dict.rkSectionMoreLongUr : dict.rkSectionMoreLong;
  const titleClass =
    locale === "ur" ? "rk-strip__title is-urdu" : "rk-strip__title";

  const inner = embedded ? "rk-strip__inner" : "rk-strip__inner";

  return (
    <section className="rk-strip">
      <div className={inner}>
        <header className="rk-strip__head">
          <h2 className={titleClass}>
            <span className="rk-strip__num" aria-hidden>
              →
            </span>{" "}
            {title}
          </h2>
          <Link href={more} className="rk-strip__more">
            {moreLabel}
          </Link>
        </header>

        {layout === "four-up" ? (
          <div className="rk-strip__grid">
            {articles.map((a) => (
              <CardTile key={a.id} article={a} locale={locale} dict={dict} />
            ))}
          </div>
        ) : (
          <ul className="rk-strip__list">
            {articles.map((a, i) => (
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
        )}
      </div>
    </section>
  );
}
