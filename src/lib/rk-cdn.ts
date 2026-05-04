/**
 * Images served from the production Rising Kashmir origin (`/uploads/news-post`,
 * `/uploads/author`). Filenames were taken from live HTML (homepage + article pages).
 */

export const RK_ORIGIN = "https://risingkashmir.com" as const;

export function rkPost(filename: string): string {
  return `${RK_ORIGIN}/uploads/news-post/${filename}`;
}

export function rkAuth(filename: string): string {
  return `${RK_ORIGIN}/uploads/author/${filename}`;
}
