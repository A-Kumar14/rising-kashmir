import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "./contact-form";

type Props = { params: { locale: string } };

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) {
    return { title: "Contact" };
  }
  const dict = getDictionary(props.params.locale as Locale);
  return {
    title: dict.contactPageTitle,
    description: dict.contactPageDescription,
    alternates: { canonical: `/${props.params.locale}/contact` },
  };
}

export default function ContactPage(props: Props) {
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
        {dict.contactPageTitle}
      </h1>
      <div className="mt-8 font-sans text-body text-[var(--text-secondary)]">
        <p className="mb-6">{dict.contactIntro}</p>
        <ContactForm
          nameLabel={dict.contactFormName}
          emailLabel={dict.contactFormEmail}
          messageLabel={dict.contactFormMessage}
          send={dict.contactFormSend}
          sending={dict.contactFormSending}
          successMessage={dict.contactFormSuccess}
        />
      </div>
    </div>
  );
}
