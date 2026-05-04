"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MORE_SECTIONS, PRIMARY_SECTIONS } from "@/lib/sections";
import { NavMore } from "./nav-more";

const LABELS: Record<string, string> = {
  kashmir: "Kashmir",
  jammu: "Jammu",
  india: "India",
  world: "World",
  opinion: "Opinion",
  sports: "Sports",
};

export function NavLinks() {
  const pathname = usePathname() ?? "/";

  return (
    <>
      <ul className="hidden flex-1 flex-wrap items-center gap-x-6 md:flex lg:gap-x-8">
        <li>
          <Link
            href="/"
            className={`inline-block border-b-2 pb-3 pt-3 font-sans text-nav font-medium transition-colors duration-120 hover:text-[var(--text-secondary)] ${
              pathname === "/"
                ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-primary)]"
            }`}
          >
            Home
          </Link>
        </li>
        {PRIMARY_SECTIONS.map((slug) => {
          const href = `/section/${slug}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={slug}>
              <Link
                href={href}
                className={`inline-block border-b-2 pb-3 pt-3 font-sans text-nav font-medium transition-colors duration-120 hover:text-[var(--text-secondary)] ${
                  active
                    ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-primary)]"
                }`}
              >
                {LABELS[slug]}
              </Link>
            </li>
          );
        })}
        <li className="ml-auto">
          <NavMore currentPath={pathname} />
        </li>
      </ul>

      <details className="group relative w-full py-2 md:hidden">
        <summary className="cursor-pointer list-none font-sans text-nav font-medium text-[var(--text-primary)]">
          <span className="flex items-center justify-between">
            Menu
            <span aria-hidden className="text-[var(--text-tertiary)]">
              ▾
            </span>
          </span>
        </summary>
        <ul className="mt-2 flex flex-col gap-1 border border-theme bg-[var(--bg-secondary)] p-3">
          <li>
            <Link href="/" className="block py-2 font-sans text-nav font-medium">
              Home
            </Link>
          </li>
          {PRIMARY_SECTIONS.map((slug) => (
            <li key={slug}>
              <Link
                href={`/section/${slug}`}
                className="block py-2 font-sans text-nav font-medium"
              >
                {LABELS[slug]}
              </Link>
            </li>
          ))}
          <li className="border-t border-theme pt-2 font-sans text-eyebrow font-medium uppercase tracking-[1px] text-[var(--text-tertiary)]">
            More
          </li>
          {MORE_SECTIONS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block py-2 font-sans text-nav font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
