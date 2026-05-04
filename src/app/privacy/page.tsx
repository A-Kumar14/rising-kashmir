import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Rising Kashmir.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        Privacy
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
          Newsletter addresses are retained until the reader unsubscribes.
          Contact submissions are retained for 24 months. Analytics are
          aggregated and not personally identifying.
        </p>
        <h2 className="mt-8 font-serif text-card-lg font-medium text-[var(--text-primary)]">
          Contacting us
        </h2>
        <p>
          Reach the editor via the{" "}
          <a className="text-[var(--link)] underline" href="/contact">
            contact form
          </a>{" "}
          for data-access or deletion requests.
        </p>
      </div>
    </div>
  );
}
