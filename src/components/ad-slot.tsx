type Props = { name: string };

/**
 * Direct ad slot placeholder — integration team provides fill.
 * No third-party CPM scripts in markup.
 */
export function AdSlot({ name }: Props) {
  return (
    <div className="my-6 flex justify-center">
      {/*
        Ad slot: name={name}
        Replace with GAM or house creative in production.
      */}
      <div
        data-ad-slot={name}
        className="flex min-h-[90px] w-full max-w-[728px] items-center justify-center border border-dashed border-theme bg-[var(--bg-secondary)] font-sans text-byline text-[var(--text-tertiary)]"
      >
        Advertisement
      </div>
    </div>
  );
}
