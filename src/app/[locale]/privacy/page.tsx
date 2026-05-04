import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { locale: string } };

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) {
    return { title: "Privacy" };
  }
  const dict = getDictionary(props.params.locale as Locale);
  return {
    title: dict.footerPrivacy,
    description: dict.privacyMetaDescription,
    alternates: { canonical: `/${props.params.locale}/privacy` },
  };
}

export default function PrivacyPage(props: Props) {
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
        {dict.footerPrivacy}
      </h1>
      <div className="mt-6 space-y-4 font-sans text-body text-[var(--text-secondary)]">
        <p>
          Placeholder copy. Replace with the final policy reviewed for India
          DPDP 2023 and GDPR before launch.
        </p>
        <h2 className="mt-8 font-serif text-card-lg font-medium text-[var(--text-primary)]">
          What we collect
        </h2>
        <p>
          Newsletter email, contact form submissions, and aggregate analytics
          (after consent). No sensitive personal data is requested.
        </p>
        <h2 className="mt-8 font-serif text-card-lg font-medium text-[var(--text-primary)]">
          How long we keep it
        </h2>
        <p>
          Retention follows operational needs and legal obligations; newsletter
          addresses can be removed on request.
        </p>
      </div>
    </div>
  );
}
