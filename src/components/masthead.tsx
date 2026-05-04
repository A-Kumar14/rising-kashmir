import Link from "next/link";

export function Masthead() {
  return (
    <header className="border-b border-theme bg-[var(--bg-primary)] py-6">
      <div className="mx-auto max-w-container px-4 text-center md:px-6">
        <p className="mb-2 font-sans text-eyebrow font-medium uppercase tracking-[1px] text-[var(--text-tertiary)]">
          Founded 2008 · Srinagar
        </p>
        <Link
          href="/"
          className="font-serif text-section-title font-medium tracking-tight text-[var(--text-primary)]"
        >
          Rising Kashmir
        </Link>
      </div>
    </header>
  );
}
