# Handoff — Rising Kashmir frontend prototype

## What is built

- **Next.js 14** (App Router), **TypeScript strict**, **Tailwind CSS** styling.
- **Homepage** (`/`) with utility bar, masthead, single primary navigation (seven sections + More), breaking-news banner (one rotating headline, 8s interval), hero + secondary column, opinion strip, Kashmir four-up strip, Sports and World list strips (two-column layout), ad placeholders, footer with newsletter form markup.
- **Article page** (`/article/[slug]`) with sanitised HTML body (`sanitize-html`, server-safe for static generation), metadata, JSON-LD `NewsArticle`, related items, responsive hero image.
- **Section pages** (`/section/[section]`) with pagination (previous/next). **Opinion** section groups by columnist (writer-first layout). Other sections list newest-first.
- **Columnists index** (`/columnists`) and **archive** (`/columnists/[slug]`).
- **About** and **Contact** static pages; **E-Paper** (`/e-paper`) redirects to `https://epaper.risingkashmir.com`.
- **Dark mode** toggle in the utility bar; preference stored in `localStorage` under `rk-theme`; `data-theme` on `<html>` matches design tokens in `src/app/globals.css`.
- **Typography**: `next/font` — **Source Serif 4** (headlines) and **Inter** (UI/body), weights 400 and 500 only.
- **No** EN/HI/UR switcher (English-only until locales are real).

## What is mocked

- All article data lives in **`src/lib/mock-articles.ts`** (~31 articles). Replace exports with API calls to `/api/v1/*` when ready.
- Weather and sign-in are non-functional stubs.
- Newsletter and contact forms post to `#` / placeholder actions.

## Backend checklist for production

1. **Articles API** returning the `Article` shape in `src/lib/article.ts`, with valid slugs or a documented normalisation policy.
2. **Image domains** added to `next.config.mjs` `images.remotePatterns` for your CDN.
3. **Breaking list** endpoint or field to populate `<BreakingBanner />`.
4. **Column metadata** for opinion (`author.column`, avatars) for columnist grouping.
5. **Redirect and sitemap** plans per **`MIGRATION.md`**.

## Commands

```bash
pnpm install   # or npm install
pnpm dev
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

If `pnpm` is unavailable, use `npm run` with the same script names.

## QA notes

- Lighthouse was not run inside this environment; run locally after `pnpm build && pnpm start` for accurate scores.
- Ad slots are `div[data-ad-slot]` placeholders only — no third-party ad scripts.
