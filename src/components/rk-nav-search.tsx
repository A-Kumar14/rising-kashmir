"use client";

import type { Locale } from "@/i18n/config";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function RkNavSearch({
  locale,
  placeholder,
}: {
  locale: Locale;
  placeholder: string;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = (inputRef.current?.value ?? "").trim();
    if (q.length > 1) {
      router.push(
        `/${locale}/search?q=${encodeURIComponent(q)}`,
      );
    }
  }

  return (
    <form className="rk-nav__search" onSubmit={submit} role="search">
      <input
        ref={inputRef}
        type="search"
        name="q"
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
      />
      <span className="rk-nav__search-icon" aria-hidden>
        ⌕
      </span>
    </form>
  );
}
