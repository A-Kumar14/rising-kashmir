import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Cookie policy for Rising Kashmir.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        Cookies
      </h1>
      <div className="mt-6 space-y-4 font-sans text-body text-[var(--text-secondary)]">
        <p>
          Placeholder copy. Replace with the final cookie policy before launch.
        </p>
        <h2 className="mt-8 font-serif text-card-lg font-medium text-[var(--text-primary)]">
          Strictly necessary
        </h2>
        <p>
          Theme preference (<code>rk-theme</code>) and consent state
          (<code>rk-consent</code>) — both first-party, no analytics or
          advertising data attached.
        </p>
        <h2 className="mt-8 font-serif text-card-lg font-medium text-[var(--text-primary)]">
          Analytics & advertising
        </h2>
        <p>
          Loaded only after explicit consent via the cookie banner. No scripts
          run before the banner is acknowledged.
        </p>
      </div>
    </div>
  );
}
