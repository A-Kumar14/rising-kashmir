/** Primary navigation maps to these section slugs */
export const PRIMARY_SECTIONS = [
  "kashmir",
  "jammu",
  "india",
  "world",
  "opinion",
  "sports",
] as const;

export type PrimarySection = (typeof PRIMARY_SECTIONS)[number];

export const MORE_SECTIONS: { label: string; href: string }[] = [
  { label: "Business", href: "/section/business" },
  { label: "Sci / Tech", href: "/section/sci-tech" },
  { label: "Travel", href: "/section/travel" },
  { label: "Entertainment", href: "/section/entertainment" },
  { label: "Editorial", href: "/section/opinion" },
  { label: "Video", href: "/section/entertainment" },
  { label: "E-Paper", href: "/e-paper" },
];

export function isPrimarySection(s: string): s is PrimarySection {
  return (PRIMARY_SECTIONS as readonly string[]).includes(s);
}

export const ALL_SECTION_SLUGS = [
  ...PRIMARY_SECTIONS,
  "business",
  "sci-tech",
  "travel",
  "entertainment",
] as const;

export function isKnownSectionSlug(slug: string): boolean {
  return (ALL_SECTION_SLUGS as readonly string[]).includes(slug);
}
