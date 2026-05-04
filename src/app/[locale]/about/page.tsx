import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { locale: string } };

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) {
    return { title: "About" };
  }
  const dict = getDictionary(props.params.locale as Locale);
  return {
    title: dict.aboutPageTitle,
    description: dict.aboutPageDescription,
    alternates: { canonical: `/${props.params.locale}/about` },
  };
}

export default function AboutPage(props: Props) {
  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);
  const titleFont = locale === "ur" ? "font-urdu" : "font-serif";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1
        className={`text-section-title font-medium text-[var(--text-primary)] ${titleFont}`}
      >
        {dict.aboutPageTitle}
      </h1>
      <div className="mt-8 space-y-4 font-sans text-body text-[var(--text-secondary)]">
        <p>{dict.aboutP1}</p>
        <p>
          {dict.aboutBeforeContactLink}{" "}
          <Link
            href={withLocale(locale, "/contact")}
            className="text-[var(--link)] hover:underline"
          >
            {dict.aboutContactLink}
          </Link>
          {dict.aboutAfterContactLink}
        </p>
      </div>
    </div>
  );
}
