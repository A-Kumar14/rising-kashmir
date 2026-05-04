import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { withLocale } from "@/i18n/path";
import { headers } from "next/headers";
import Link from "next/link";

export default async function NotFound() {
  const raw = headers().get("x-locale");
  const locale: Locale = raw === "ur" ? "ur" : "en";
  const dict = getDictionary(locale);
  const titleFont = locale === "ur" ? "font-urdu" : "font-serif";

  return (
    <div className="mx-auto max-w-container px-4 py-20 text-center md:px-6">
      <h1
        className={`text-section-title font-medium text-[var(--text-primary)] ${titleFont}`}
      >
        {dict.notFoundTitle}
      </h1>
      <p className="mt-4 font-sans text-body text-[var(--text-secondary)]">
        {dict.notFoundDescription}
      </p>
      <p className="mt-6">
        <Link
          href={withLocale(locale, "/")}
          className="font-sans text-nav font-medium text-[var(--link)] hover:underline"
        >
          {dict.notFoundHome}
        </Link>
      </p>
    </div>
  );
}
