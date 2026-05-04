import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Rising Kashmir.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        Terms of use
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
