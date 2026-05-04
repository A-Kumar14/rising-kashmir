import { ThemeToggle } from "./theme-root";

function todayStr() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export function UtilityBar() {
  return (
    <div className="h-10 border-b border-theme bg-[var(--bg-secondary)]">
      <div className="mx-auto flex h-full max-w-container items-center justify-between px-4 md:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-utility text-[var(--text-secondary)]">
          <time dateTime={new Date().toISOString()}>{todayStr()}</time>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span className="hidden sm:inline">Srinagar · Weather unavailable</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/e-paper"
            className="text-utility font-medium text-[var(--link)] underline-offset-2 hover:underline"
          >
            E-Paper
          </a>
          <span
            className="text-utility text-[var(--text-tertiary)]"
            title="Account access is not available in this preview"
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
