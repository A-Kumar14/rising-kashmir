import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { locale: string } };

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) {
    return { title: "Terms" };
  }
  const dict = getDictionary(props.params.locale as Locale);
  return {
    title: dict.footerTerms,
    description: dict.termsMetaDescription,
    alternates: { canonical: `/${props.params.locale}/terms` },
  };
}

export default function TermsPage(props: Props) {
  if (!isLocale(props.params.locale)) {
    notFound();
  }
  const dict = getDictionary(props.params.locale as Locale);
  const titleFont = props.params.locale === "ur" ? "font-urdu" : "font-serif";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1
        className={`text-section-title font-medium text-[var(--text-primary)] ${titleFont}`}
      >
        {dict.termsPageH1}
      </h1>
      <div className="mt-6 space-y-4 font-sans text-body text-[var(--text-secondary)]">
        <p>
          Placeholder copy. Replace with terms reviewed by counsel before
          launch.
        </p>
        <h2 className="mt-8 font-serif text-card-lg font-medium text-[var(--text-primary)]">
          Use of content
        </h2>
        <p>
          Articles are © Rising Kashmir. Linking and short quotation with
          attribution are welcome; republication requires written permission.
        </p>
        <h2 className="mt-8 font-serif text-card-lg font-medium text-[var(--text-primary)]">
          Corrections
        </h2>
        <p>
          We correct material errors promptly and note changes on the affected
          article. Send corrections via the contact form.
        </p>
      </div>
    </div>
  );
}
