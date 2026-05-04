export function formatSectionLabel(section: string): string {
  if (section === "sci-tech") return "Sci / Tech";
  return section
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
