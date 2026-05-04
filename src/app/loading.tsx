export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-container px-4 py-16 md:px-6"
    >
      <div className="h-8 w-1/3 animate-pulse rounded bg-[var(--bg-tertiary)]" />
      <div className="mt-6 h-64 w-full animate-pulse rounded bg-[var(--bg-tertiary)]" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-[var(--bg-tertiary)]" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--bg-tertiary)]" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--bg-tertiary)]" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
