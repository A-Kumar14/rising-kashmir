"use client";

import type { Article } from "@/lib/article";
import { articleHref } from "@/lib/slug";
import Link from "next/link";
import { useEffect, useState } from "react";

const INTERVAL_MS = 8000;

type Props = { articles: Article[] };

export function BreakingBanner({ articles }: Props) {
  const list = articles.length > 0 ? articles : [];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (list.length <= 1) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length);
        setVisible(true);
      }, 180);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [list.length]);

  if (list.length === 0) {
    return null;
  }

  const current = list[index] ?? list[0]!;

  return (
    <div
      className="text-[var(--bg-primary)]"
      style={{ backgroundColor: "var(--brand-red)" }}
      role="region"
      aria-label="Breaking news"
    >
      <div className="mx-auto flex h-9 max-w-container items-center gap-3 px-4 md:h-[36px] md:px-6">
        <span className="shrink-0 rounded-full bg-[var(--bg-primary)] px-2 py-0.5 font-sans text-eyebrow font-medium uppercase tracking-[1px] text-[var(--brand-red)]">
          Breaking
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className={`truncate font-sans text-nav font-medium transition-opacity duration-180 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link href={articleHref(current.slug)} className="hover:underline">
              {current.title}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
