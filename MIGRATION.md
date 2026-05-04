# URL migration — open questions for backend

Before replacing the legacy Rising Kashmir frontend, the following items need alignment with the PHP/API team and SEO owners.

## Legacy URL shape

The current public site serves many thousands of articles at paths similar to `/lg-sinha-vows-strong-action-against-drug-peddlers-calls-them-threat-to-nation` (no `/article/` prefix). The new App Router prototype uses `/article/[slug]` for detail pages.

## Redirect map

- Produce a CSV or database table mapping **old path → new canonical path** (or **old slug → new slug** if slugs are normalized differently).
- Implement `redirects()` in `next.config.mjs` or Edge middleware once the map is available. Size and update cadence (build-time vs runtime) should be agreed.

## Slug validation policy

- API responses must expose slugs matching `/^[a-z0-9-]+$/`. When they do not, the client normalizes and logs a warning today.
- Decide **301 vs 410** when an old slug cannot be mapped or normalized uniquely.

## Sitemap and indexing

- Plan regeneration when articles publish or update (cron, webhook, or incremental API).
- Confirm canonical host (`www` vs apex) and hreflang only when Hindi/Urdu locales ship.

## API contract

- Replace `lib/mock-articles.ts` with fetches to `/api/v1/*` (exact endpoints, auth, and caching TBD).
- Confirm ISO 8601 fields, HTML body sanitisation expectations, and image CDN domains for `next/image`.

These items are **documented only**; they are not implemented in this prototype.
