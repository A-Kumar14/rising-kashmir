"use client";

import type { Article } from "@/lib/article";
import { getArticleTitle } from "@/lib/article-display";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { rkRelTime } from "@/lib/rk-time";
import { articleHref } from "@/lib/slug";
import Link from "next/link";
import { useEffect, useState } from "react";

const INTERVAL_MS = 5000;

type Props = {
  articles: Article[];
  locale: Locale;
  dict: UiDictionary;
};

export function BreakingBanner({ articles, locale, dict }: Props) {
  const list = articles.length > 0 ? articles : [];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (list.length <= 1) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length);
        setVisible(true);
      }, 200);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [list.length]);

  if (list.length === 0) {
    return null;
  }

  const current = list[index] ?? list[0]!;
  const titleClass =
    locale === "ur"
      ? "rk-breaking__title is-urdu"
      : "rk-breaking__title";

  return (
    <div className="rk-breaking" role="region" aria-label={dict.breakingLabel}>
      <div className="rk-breaking__inner">
        <span className="rk-breaking__tag">
          <span className="rk-breaking__pulse" aria-hidden />
          {dict.breakingLabel}
        </span>
        <ul className="rk-breaking__dots" aria-hidden>
          {list.map((_, n) => (
            <li key={n} className={n === index ? "is-on" : ""} />
          ))}
        </ul>
        <Link
          href={articleHref(locale, current.slug)}
          className={`${titleClass} ${visible ? "" : "opacity-0"}`}
          style={{ transition: "opacity 0.35s ease" }}
        >
          {getArticleTitle(current, locale)}
        </Link>
        <span className="rk-breaking__time">
          {rkRelTime(current.published_at, locale)}
        </span>
      </div>
    </div>
  );
}
