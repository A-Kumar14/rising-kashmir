"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "./actions";

const initial: ContactState = { status: "idle" };

type FormLabels = {
  send: string;
  sending: string;
};

function SubmitButton({ send, sending }: FormLabels) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-fit rounded border border-theme bg-[var(--bg-tertiary)] px-4 py-2 font-sans text-nav font-medium text-[var(--text-primary)] disabled:opacity-60"
    >
      {pending ? sending : send}
    </button>
  );
}

type Props = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  send: string;
  sending: string;
  successMessage: string;
};

export function ContactForm({
  nameLabel,
  emailLabel,
  messageLabel,
  send,
  sending,
  successMessage,
}: Props) {
  const [state, formAction] = useFormState(submitContact, initial);

  if (state.status === "ok") {
    return (
      <p
        role="status"
        className="rounded border border-theme bg-[var(--bg-secondary)] p-4 font-sans text-body text-[var(--text-primary)]"
      >
        {successMessage}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label className="flex flex-col gap-1 font-sans text-byline text-[var(--text-primary)]">
        {nameLabel}
        <input
          name="name"
          required
          minLength={2}
          maxLength={200}
          className="rounded border border-theme bg-[var(--bg-primary)] px-3 py-2 font-sans text-body"
        />
      </label>
      <label className="flex flex-col gap-1 font-sans text-byline text-[var(--text-primary)]">
        {emailLabel}
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded border border-theme bg-[var(--bg-primary)] px-3 py-2 font-sans text-body"
        />
      </label>
      <label className="flex flex-col gap-1 font-sans text-byline text-[var(--text-primary)]">
        {messageLabel}
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className="rounded border border-theme bg-[var(--bg-primary)] px-3 py-2 font-sans text-body"
        />
      </label>
      {state.status === "error" ? (
        <p role="alert" className="font-sans text-byline text-red-600">
          {state.message}
        </p>
      ) : null}
      <SubmitButton send={send} sending={sending} />
    </form>
  );
}
