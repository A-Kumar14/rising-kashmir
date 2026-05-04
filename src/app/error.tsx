"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: forward to Sentry / error tracker once wired.
    console.error("[route error]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        Something went wrong
      </h1>
      <p className="mt-4 font-sans text-body text-[var(--text-secondary)]">
        The page failed to load. Try again, or head back to the homepage.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded border border-theme bg-[var(--bg-tertiary)] px-4 py-2 font-sans text-nav font-medium text-[var(--text-primary)]"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded border border-theme px-4 py-2 font-sans text-nav text-[var(--text-primary)]"
        >
          Home
        </a>
      </div>
    </div>
  );
}
