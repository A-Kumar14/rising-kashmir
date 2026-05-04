import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rising Kashmir.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        Contact
      </h1>
      <div className="mt-8 font-sans text-body text-[var(--text-secondary)]">
        <p className="mb-6">
          For reader feedback, corrections, and editorial correspondence, use
          the form below.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
