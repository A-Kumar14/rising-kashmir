"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  subscribeNewsletter,
  type NewsletterState,
} from "@/lib/newsletter-actions";

const initial: NewsletterState = { status: "idle" };

function SubscribeButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded border border-theme bg-[var(--bg-tertiary)] px-4 py-2 font-sans text-nav font-medium text-[var(--text-primary)] disabled:opacity-60"
    >
      {pending ? "…" : "Subscribe"}
    </button>
  );
}

export function NewsletterForm() {
  const [state, formAction] = useFormState(subscribeNewsletter, initial);

  if (state.status === "ok") {
    return (
      <p
        role="status"
        className="font-sans text-byline text-[var(--text-secondary)]"
      >
        Thanks — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
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
      <SubscribeButton />
      {state.status === "error" ? (
        <p
          role="alert"
          className="font-sans text-byline text-red-600 sm:basis-full"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
