"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MORE_SECTIONS } from "@/lib/sections";

export function NavMore({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="border-b-2 border-transparent pb-3 pt-3 font-sans text-nav font-medium text-[var(--text-primary)] transition-colors duration-120 hover:text-[var(--text-secondary)] data-[active=true]:border-[var(--text-primary)]"
        data-active={MORE_SECTIONS.some((m) => currentPath.startsWith(m.href))}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        More
      </button>
      {open ? (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[12rem] rounded border border-theme bg-[var(--bg-primary)] py-2 shadow-lg transition-opacity duration-120"
          role="menu"
        >
          {MORE_SECTIONS.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              role="menuitem"
              className="block px-4 py-2 font-sans text-nav font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
