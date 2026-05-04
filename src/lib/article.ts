export type Section =
  | "kashmir"
  | "jammu"
  | "india"
  | "world"
  | "opinion"
  | "sports"
  | "business"
  | "sci-tech"
  | "travel"
  | "entertainment";

export type Article = {
  id: string;
  slug: string;
  title: string;
  dek: string | null;
  body: string;
  section: Section;
  tags: string[];
  author: {
    name: string;
    slug: string;
    avatar: string | null;
    column: string | null;
  } | null;
  hero_image: { url: string; alt: string; credit: string } | null;
  published_at: string;
  updated_at: string;
  reading_time_minutes: number;
  is_breaking: boolean;
  /** Optional Urdu (and future) overlays for headlines — body may stay English until CMS translations. */
  i18n?: {
    ur: { title: string; dek: string | null; body?: string };
  };
};
