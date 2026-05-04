import Link from "next/link";
import { PRIMARY_SECTIONS } from "@/lib/sections";

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
          <form
            className="flex flex-col gap-2 sm:flex-row"
            action="#"
            method="post"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded border border-theme bg-[var(--bg-primary)] px-3 py-2 font-sans text-body text-[var(--text-primary)]"
            />
            <button
              type="submit"
              className="rounded border border-theme bg-[var(--bg-tertiary)] px-4 py-2 font-sans text-nav font-medium text-[var(--text-primary)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-theme py-4 text-center font-sans text-byline text-[var(--text-tertiary)]">
        © {new Date().getFullYear()} Rising Kashmir. All rights reserved.
      </div>
    </footer>
  );
}
