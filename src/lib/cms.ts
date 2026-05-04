/**
 * CMS facade. Pages and route handlers should import from here, never from
 * `mock-articles` directly. Swap the underlying implementation when the
 * headless CMS lands by replacing the re-export below with a typed client
 * (Sanity/Strapi/Contentful/Payload). Public function signatures must remain
 * stable so call sites do not need to change.
 *
 * See `MIGRATION.md` for the API contract this facade must preserve.
 */
export {
  articles,
  getArticleBySlug,
  getBreakingArticles,
  getLeadStory,
  getHomeSecondary,
  getBySection,
  getOpinionFeatured,
  getColumnists,
  getRecentArticles,
  getSectionPage,
} from "./mock-articles";
