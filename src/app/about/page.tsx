import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Rising Kashmir — Srinagar's English daily.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        About Rising Kashmir
      </h1>
      <div className="mt-8 space-y-4 font-sans text-body text-[var(--text-secondary)]">
        <p>
          Rising Kashmir is a regional English-language daily published from
          Srinagar. This prototype demonstrates the redesigned information
          architecture, typography, and templates planned for the public site.
        </p>
        <p>
          Editorial inquiries should route through the{" "}
          <a className="text-[var(--link)] hover:underline" href="/contact">
            contact page
          </a>
          . Subscription and account flows are out of scope for this frontend
          milestone.
        </p>
      </div>
    </div>
  );
}
