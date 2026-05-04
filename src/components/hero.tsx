import type { Article } from "@/lib/article";
import {
  getArticleDek,
  getArticleTitle,
  getSectionLabel,
} from "@/lib/article-display";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { getAuthorName } from "@/lib/byline";
import { rkRelTime } from "@/lib/rk-time";
import { articleHref } from "@/lib/slug";
import Link from "next/link";
import {
  CardLead,
  CardSecondary,
  RkArticleImage,
} from "./rk-cards";

export type HeroVariant = "editorial" | "magazine" | "wire";

export function HeroToolbar({
  locale,
  variant,
  dict,
}: {
  locale: Locale;
  variant: HeroVariant;
  dict: UiDictionary;
}) {
  const base = `/${locale}`;
  const items: { id: HeroVariant; label: string }[] = [
    { id: "editorial", label: dict.rkHeroEditorial },
    { id: "magazine", label: dict.rkHeroMagazine },
    { id: "wire", label: dict.rkHeroWire },
  ];
  return (
    <div className="rk-hero-toolbar">
      {items.map((v) => (
        <Link
          key={v.id}
          href={v.id === "editorial" ? base : `${base}?hero=${v.id}`}
          className={variant === v.id ? "is-current" : ""}
          scroll={false}
        >
          {v.label}
        </Link>
      ))}
    </div>
  );
}

type Props = {
  lead: Article;
  secondaries: Article[];
  locale: Locale;
  dict: UiDictionary;
  variant: HeroVariant;
};

export function Hero({ lead, secondaries, locale, dict, variant }: Props) {
  if (variant === "wire") {
    const all = [lead, ...secondaries].slice(0, 4);
    return (
      <section className="rk-hero rk-hero--wire">
        <HeroToolbar locale={locale} variant={variant} dict={dict} />
        <div className="rk-section-rule">
          <span>
            {locale === "en"
              ? dict.rkHeroWireRule.toUpperCase()
              : dict.rkHeroWireRule}
          </span>
        </div>
        <div className="rk-hero__wire">
          {all.map((a) => (
            <div key={a.id} className="rk-hero__wire-item">
              <CardSecondary article={a} locale={locale} dict={dict} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (variant === "magazine") {
    const href = articleHref(locale, lead.slug);
    const title = getArticleTitle(lead, locale);
    const dek = getArticleDek(lead, locale);
    const by = getAuthorName(lead);
    const sec = getSectionLabel(lead.section, dict.sectionLabels);
    const eyebrow =
      locale === "en" ? sec.toUpperCase() : sec;
    const titleClass =
      locale === "ur" ? "rk-hero__mag-title is-urdu" : "rk-hero__mag-title";

    return (
      <section className="rk-hero rk-hero--mag">
        <HeroToolbar locale={locale} variant={variant} dict={dict} />
        <div className="rk-hero__mag">
          <Link href={href} className="rk-hero__mag-media">
            <RkArticleImage article={lead} ratio="3x4" priority />
          </Link>
          <div className="rk-hero__mag-body">
            <div className="rk-eyebrow rk-eyebrow--accent">
              <span>{eyebrow}</span>
              <span className="rk-eyebrow__dot" aria-hidden>
                ●
              </span>
              <span>{rkRelTime(lead.published_at, locale)}</span>
            </div>
            <Link href={href} className={titleClass}>
              {title}
            </Link>
            {dek ? <p className="rk-hero__mag-dek">{dek}</p> : null}
            <p className="rk-byline">
              <span className="rk-byline__by">{dict.rkBy}</span>{" "}
              <span className="rk-byline__name">{by}</span>
              <span className="rk-byline__sep">·</span>
              <span>
                {lead.reading_time_minutes} {dict.articleMinRead}
              </span>
            </p>
            <div className="rk-hero__mag-stack">
              {secondaries.map((s) => (
                <CardSecondary key={s.id} article={s} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rk-hero rk-hero--editorial">
      <HeroToolbar locale={locale} variant="editorial" dict={dict} />
      <div className="rk-hero__grid">
        <CardLead article={lead} locale={locale} dict={dict} />
        <aside className="rk-hero__rail">
          <div className="rk-rail-head">
            <span className="rk-rail-head__line" />
            <span className="rk-rail-head__text">
              {locale === "en"
                ? dict.rkAlsoOnFront.toUpperCase()
                : dict.rkAlsoOnFront}
            </span>
            <span className="rk-rail-head__line" />
          </div>
          {secondaries.map((s) => (
            <CardSecondary key={s.id} article={s} locale={locale} dict={dict} />
          ))}
        </aside>
      </div>
    </section>
  );
}
