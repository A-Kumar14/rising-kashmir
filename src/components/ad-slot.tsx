import { getSampleAd } from "./ads/registry";

type Props = { name: string };

/**
 * House sample creatives only — no third-party ad scripts.
 * Slot name maps to a sample layout in `ads/registry.tsx`.
 */
export function AdSlot({ name }: Props) {
  const Creative = getSampleAd(name);
  return (
    <aside
      className="rk-ad-slot"
      aria-label="Advertisement"
      data-ad-slot={name}
    >
      <Creative />
    </aside>
  );
}
