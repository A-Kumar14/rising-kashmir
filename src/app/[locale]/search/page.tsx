import { CardThumb } from "@/components/rk-cards";
import type { Article } from "@/lib/article";
import { getArticleTitle } from "@/lib/article-display";
import { articles } from "@/lib/cms";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { locale: string };
  searchParams: { q?: string };
};

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) {
    return { title: "Search" };
  }
  const dict = getDictionary(props.params.locale as Locale);
  const q = (props.searchParams?.q ?? "").trim();
  return {
    title: q ? `${q} · ${dict.rkSearchPlaceholder}` : dict.rkSearchPlaceholder,
  };
}

function filterArticles(q: string, locale: Locale): Article[] {
  const n = q.trim().toLowerCase();
  if (n.length < 2) return [];
  return articles.filter((a) => {
    const t = getArticleTitle(a, locale).toLowerCase();
    const dek = (a.dek ?? "").toLowerCase();
    const auth = (a.author?.name ?? "").toLowerCase();
    return (
      t.includes(n) ||
      dek.includes(n) ||
      auth.includes(n) ||
      a.section.includes(n)
    );
  });
}

export default function SearchPage(props: Props) {
  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);
  const q = (props.searchParams?.q ?? "").trim();
  const results = filterArticles(q, locale);

  return (
    <div className="rk-search">
      <header className="rk-sectionpage__head">
        <p className="rk-sectionpage__kicker">— SEARCH</p>
        <h1 className="rk-sectionpage__title">&ldquo;{q}&rdquo;</h1>
        <p className="rk-sectionpage__count">
          {results.length}{" "}
          {results.length === 1 ? "result" : "results"}
        </p>
      </header>
      {results.length === 0 ? (
        <p className="rk-empty">
          {q.length < 2
            ? "Enter at least two characters to search."
            : "No stories matched that query."}
        </p>
      ) : (
        <ul className="rk-strip__list">
          {results.map((a, i) => (
            <li key={a.id}>
              <CardThumb article={a} locale={locale} dict={dict} idx={i} />
            </li>
          ))}
        </ul>
      )}
      <p className="rk-sectionpage__count" style={{ marginTop: "24px" }}>
        <Link href={`/${locale}`} className="rk-article__back">
          {dict.rkBackToFront}
        </Link>
      </p>
    </div>
  );
}
