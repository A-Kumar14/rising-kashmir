import Link from "next/link";
import { PRIMARY_SECTIONS } from "@/lib/sections";
import { NewsletterForm } from "@/components/newsletter-form";

const SECTION_LABEL: Record<string, string> = {
  kashmir: "Kashmir",
  jammu: "Jammu",
  india: "India",
  world: "World",
  opinion: "Opinion",
  sports: "Sports",
};

export function SiteFooter() {
  return (
    <footer className="border-t border-theme bg-[var(--bg-secondary)]">
      <div className="mx-auto grid max-w-container gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h2 className="mb-3 font-serif text-card-lg font-medium text-[var(--text-primary)]">
            About
          </h2>
          <ul className="space-y-2 font-sans text-body text-[var(--text-secondary)]">
            <li>
              <Link href="/about" className="text-[var(--link)] hover:underline">
                About / Masthead
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[var(--link)] hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="/e-paper"
                className="text-[var(--link)] hover:underline"
              >
                E-Paper
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-card-lg font-medium text-[var(--text-primary)]">
            Sections
          </h2>
          <ul className="space-y-2 font-sans text-body text-[var(--text-secondary)]">
            {PRIMARY_SECTIONS.map((s) => (
              <li key={s}>
                <Link
                  href={`/section/${s}`}
                  className="text-[var(--link)] hover:underline"
                >
                  {SECTION_LABEL[s]}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/columnists"
                className="text-[var(--link)] hover:underline"
              >
                Columnists
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-card-lg font-medium text-[var(--text-primary)]">
            Newsletter
          </h2>
          <p className="mb-3 font-sans text-dek text-[var(--text-secondary)]">
            Morning headlines for Srinagar and J&amp;K. We will only use this
            address for the digest.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-theme py-4 text-center font-sans text-byline text-[var(--text-tertiary)]">
        <nav className="mb-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="/privacy" className="text-[var(--link)] hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-[var(--link)] hover:underline">
            Terms
          </Link>
          <Link href="/cookies" className="text-[var(--link)] hover:underline">
            Cookies
          </Link>
          <a href="/feed.xml" className="text-[var(--link)] hover:underline">
            RSS
          </a>
        </nav>
        © {new Date().getFullYear()} Rising Kashmir. All rights reserved.
      </div>
    </footer>
  );
}
