import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rising Kashmir.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        Contact
      </h1>
      <div className="mt-8 font-sans text-body text-[var(--text-secondary)]">
        <p className="mb-6">
          For reader feedback, corrections, and editorial correspondence, use the
          form below. This prototype does not transmit messages; wire the action
          to your CRM or inbox endpoint.
        </p>
        <form className="flex max-w-md flex-col gap-4" action="#" method="post">
          <label className="flex flex-col gap-1 font-sans text-byline text-[var(--text-primary)]">
            Name
            <input
              name="name"
              required
              className="rounded border border-theme bg-[var(--bg-primary)] px-3 py-2 font-sans text-body"
            />
          </label>
          <label className="flex flex-col gap-1 font-sans text-byline text-[var(--text-primary)]">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded border border-theme bg-[var(--bg-primary)] px-3 py-2 font-sans text-body"
            />
          </label>
          <label className="flex flex-col gap-1 font-sans text-byline text-[var(--text-primary)]">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="rounded border border-theme bg-[var(--bg-primary)] px-3 py-2 font-sans text-body"
            />
          </label>
          <button
            type="submit"
            className="w-fit rounded border border-theme bg-[var(--bg-tertiary)] px-4 py-2 font-sans text-nav font-medium text-[var(--text-primary)]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
