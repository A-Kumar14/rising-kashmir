import { NavLinks } from "./nav-links";

export function PrimaryNav() {
  return (
    <nav
      aria-label="Primary"
      className="border-b border-theme bg-[var(--bg-primary)]"
    >
      <div className="mx-auto flex max-w-container items-center justify-between gap-2 px-4 md:px-6">
        <NavLinks />
      </div>
    </nav>
  );
}
