"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "rk-consent";

type Choice = "accepted" | "rejected";

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null | "loading">("loading");

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      setChoice(v === "accepted" || v === "rejected" ? v : null);
    } catch {
      setChoice(null);
    }
  }, []);

  if (choice !== null) return null;

  const persist = (next: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / disabled storage */
    }
    setChoice(next);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-theme bg-[var(--bg-secondary)] px-4 py-4 md:px-6"
    >
      <div className="mx-auto flex max-w-container flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="font-sans text-byline text-[var(--text-secondary)]">
          We use strictly necessary cookies to remember your theme and consent
          choice. Analytics and advertising cookies load only after you accept.{" "}
          <Link href="/cookies" className="text-[var(--link)] underline">
            Cookie policy
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => persist("rejected")}
            className="rounded border border-theme px-3 py-1.5 font-sans text-nav text-[var(--text-primary)]"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => persist("accepted")}
            className="rounded border border-theme bg-[var(--bg-tertiary)] px-3 py-1.5 font-sans text-nav font-medium text-[var(--text-primary)]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}
