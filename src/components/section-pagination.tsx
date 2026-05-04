import Link from "next/link";

type Props = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

export function SectionPagination({ basePath, currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  const href = (p: number) =>
    p <= 1 ? basePath : `${basePath}?page=${p}`;

  return (
    <nav
      className="mt-10 flex items-center justify-between gap-4 border-t border-theme pt-6 font-sans text-nav font-medium"
      aria-label="Pagination"
    >
      <div>
        {prev ? (
          <Link
            href={href(prev)}
            className="text-[var(--link)] hover:underline"
            rel="prev"
          >
            ← Previous
          </Link>
        ) : (
          <span className="text-[var(--text-tertiary)]">← Previous</span>
        )}
      </div>
      <span className="text-[var(--text-secondary)]">
        Page {currentPage} of {totalPages}
      </span>
      <div>
        {next ? (
          <Link
            href={href(next)}
            className="text-[var(--link)] hover:underline"
            rel="next"
          >
            Next →
          </Link>
        ) : (
          <span className="text-[var(--text-tertiary)]">Next →</span>
        )}
      </div>
    </nav>
  );
}
