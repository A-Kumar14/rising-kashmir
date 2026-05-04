# Future implementation — Rising Kashmir

Phased roadmap of work required to take the prototype documented in
`HANDOFF.md` to a production product. Open questions for backend are tracked
in `MIGRATION.md`; this file enumerates the engineering tasks.

Phases:
- **P0 — Launch-blocking.** Required before public switchover from legacy site.
- **P1 — First 30 days post-launch.** Ship-fast follow-ups; site is live without these but degraded.
- **P2 — Beyond launch.** Revenue, growth, and platform expansion.

Effort key: **S** ≤1 day, **M** 2–5 days, **L** >1 week.

---

## P0 — Launch-blocking

### Data & CMS
- [ ] **Pick + provision headless CMS** (Sanity, Strapi, Contentful, or Payload). **L**
- [ ] Define API surface that returns the `Article` shape from `src/lib/article.ts`; document in `MIGRATION.md`. **M**
- [ ] Replace every export in `src/lib/mock-articles.ts` with a typed CMS client (`src/lib/cms.ts`). **M**
- [ ] Add breaking-news endpoint/field; wire `src/components/breaking-banner.tsx` to live feed instead of single rotating mock headline. **S**
- [ ] Add `author.column` + avatar fields so `src/components/opinion-section-page.tsx` can group reliably. **S**

### SEO & migration
- [ ] `src/app/sitemap.ts` — generate from CMS article index. **S**
- [ ] `src/app/robots.ts`. **S**
- [ ] `src/app/feed.xml/route.ts` — RSS for sections + site-wide. **M**
- [ ] Add `<link rel="canonical">` per article in `src/app/article/[slug]/page.tsx` metadata. **S**
- [ ] Implement `redirects()` in `next.config.mjs` from the legacy → new slug map promised in `MIGRATION.md`. **M**
- [ ] Decide 301 vs 410 for unmappable slugs; encode in `src/app/not-found.tsx` or middleware. **S**
- [ ] Verify `metadataBase` in `src/app/layout.tsx` matches production host. **S**

### Forms
- [ ] Convert `/contact` form to a Next.js server action; add Zod validation + honeypot + rate limit. **M**
- [ ] Wire footer newsletter to ESP (Mailchimp/Brevo); add double opt-in + unsubscribe route. **M**
- [ ] Replace `action="#"` placeholders site-wide. **S**

### Security
- [ ] Add security headers in `next.config.mjs`: CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. **M**
- [ ] Rate-limit middleware (`src/middleware.ts`) for form endpoints. **S**
- [ ] Audit `src/lib/sanitize.ts` allow-list against real CMS HTML; document iframe policy. **S**

### Legal & consent
- [ ] `/privacy`, `/terms`, `/cookies` static pages under `src/app/`. **S**
- [ ] Cookie-consent banner component; gate analytics + ad scripts on consent. **M**
- [ ] India DPDP 2023 + GDPR review of newsletter + analytics flows. **S**

### Performance & caching
- [ ] Add `export const revalidate = 60` (or appropriate value) to `src/app/article/[slug]/page.tsx` and `src/app/section/[section]/page.tsx`. **S**
- [ ] On-demand revalidation route (`src/app/api/revalidate/route.ts`) callable by CMS webhook. **S**
- [ ] Real CDN image domain in `next.config.mjs` `images.remotePatterns`; remove Unsplash mocks. **S**

### Observability
- [ ] Analytics: GA4 or Plausible script in `src/app/layout.tsx`, gated on consent. **S**
- [ ] Sentry (`@sentry/nextjs`) for client + server error tracking. **M**
- [ ] `src/app/error.tsx`, `src/app/global-error.tsx`, route-level `loading.tsx` where useful. **S**
- [ ] Web-vitals reporter posting to analytics. **S**

### CI / deploy
- [ ] `.github/workflows/ci.yml` — lint, typecheck, vitest, build on PR. **S**
- [ ] Deploy target chosen (Vercel/Netlify/self-hosted) with project file committed. **S**
- [ ] Pin runtime: add `engines.node` to `package.json`. **S**
- [ ] Husky + lint-staged for pre-commit. **S**

---

## P1 — First 30 days post-launch

### Search & discovery
- [ ] Search input in `src/components/masthead.tsx`. **S**
- [ ] Backing index — Algolia, Meilisearch, or Postgres FTS. **M**
- [ ] `src/app/tag/[tag]/page.tsx` — surface existing `Article.tags[]`. **S**
- [ ] Related-by-tag in addition to related-by-section in article view. **S**

### Ads
- [ ] Replace `src/components/ad-slot.tsx` placeholder with GAM / Google Publisher Tag loader. **M**
- [ ] Lazy-load + viewability tracking. **S**
- [ ] Consent-mode v2 wiring with cookie banner. **S**

### Internationalisation
- [ ] `next-intl` (or `next-i18next`) middleware; routes `/en`, `/hi`, `/ur`. **L**
- [ ] Locale switcher in `src/components/utility-bar.tsx` (replace hardcoded `en-IN` date locale). **S**
- [ ] Load Noto Nastaliq Urdu + Noto Sans Devanagari via `next/font`. **S**
- [ ] RTL stylesheet pass for Urdu. **M**

### Media
- [ ] Whitelist YouTube + JW Player iframes in `src/lib/sanitize.ts`. **S**
- [ ] Video embed component for article body. **M**
- [ ] Image blur placeholders (`placeholder="blur"`) wired through CMS asset pipeline. **S**

### Editorial workflow
- [ ] CMS roles: editor, contributor, admin. **M**
- [ ] Draft / scheduled / published states; preview mode in Next.js. **M**
- [ ] Comment system (Coral, Disqus, or build-out). **L**
- [ ] Live-blog / live-update format for breaking events. **L**

### Testing
- [ ] Component tests under `src/components/*.test.tsx` (mirror `src/lib/slug.test.ts` pattern). **M**
- [ ] Playwright E2E: homepage smoke, article render, section pagination, search, newsletter signup. **M**

### UX polish
- [ ] Mobile drawer nav; verify `src/components/primary-nav.tsx` collapse behaviour. **S**
- [ ] SSR cookie sync in `src/components/theme-root.tsx` to remove flash-of-wrong-theme. **S**
- [ ] Skip-link + landmark/ARIA audit across components. **S**

### PWA
- [ ] `public/manifest.json` + icon set. **S**
- [ ] `next-pwa` (or hand-rolled SW) for offline article caching. **M**

---

## P2 — Beyond launch

### Monetisation
- [ ] Subscription / paywall via Stripe + Razorpay (India). **L**
- [ ] Account system (Auth.js) — register, login, manage subscription. **L**
- [ ] Metered paywall logic (e.g. 5 free articles/month). **M**
- [ ] Native e-paper viewer to replace external `epaper.risingkashmir.com` redirect in `/e-paper`. **L**

### Growth
- [ ] Push notifications (web push + FCM). **M**
- [ ] Personalised "for you" rail using read history. **L**
- [ ] Newsletter editions (daily briefing) with templated send. **M**
- [ ] Social-share Open Graph image generator (`src/app/og/route.tsx`). **S**

### Platform
- [ ] Native iOS / Android via Capacitor or React Native wrapper. **L**
- [ ] Editor-facing analytics dashboard (top stories, dwell time). **M**
- [ ] AMP variant of article pages, if traffic data justifies. **M**

---

## Cross-references

- `HANDOFF.md` — what is already built and what is mocked.
- `MIGRATION.md` — backend open questions feeding the P0 SEO and CMS items.
