import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-container px-4 py-20 text-center md:px-6">
      <h1 className="font-serif text-section-title font-medium text-[var(--text-primary)]">
        Page not found
      </h1>
      <p className="mt-4 font-sans text-body text-[var(--text-secondary)]">
        The story or section you requested is unavailable in this preview.
      </p>
      <p className="mt-6">
        <Link href="/" className="font-sans text-nav font-medium text-[var(--link)] hover:underline">
          Return home
        </Link>
      </p>
    </div>
  );
}
