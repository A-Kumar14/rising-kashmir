# Cursor / Claude Code Prompt — Rising Kashmir Editorial Redesign

Paste the entire block below into Cursor or Claude Code. It contains the full design context, file structure, exact CSS, and exact React (JSX) so the agent can port the prototype into the existing Next.js / Tailwind / TypeScript codebase.

---

## ROLE

You are implementing an **editorial redesign of Rising Kashmir** that already exists as a working React + vanilla CSS prototype. Your job is to port that prototype into the existing Next.js 14 (app router) + TypeScript + Tailwind codebase under `src/`.

Do **not** invent layout — reproduce exactly what's in the reference code below. Treat the CSS as the source of truth for spacing, type scale, color tokens, borders, and grid behavior.

## TARGET STACK

The repo is Next.js (app router) + TS + Tailwind. Existing files of interest:

```
src/app/[locale]/...                  # locale routing already wired (en / ur)
src/app/globals.css                   # base global styles
src/components/masthead.tsx           # replace
src/components/utility-bar.tsx        # replace
src/components/primary-nav.tsx        # replace
src/components/breaking-banner.tsx    # replace
src/components/hero.tsx               # replace
src/components/opinion-strip.tsx      # replace
src/components/section-strip.tsx      # replace
src/components/article-card.tsx       # replace / refactor into Lead/Secondary/Tile/Thumb
src/components/newsletter-form.tsx    # replace (becomes a band, not a form fragment)
src/components/footer.tsx             # replace
src/components/site-header.tsx        # composes utility-bar → masthead → primary-nav
src/components/theme-root.tsx         # extend: support data-theme="light|dark|sepia", data-serif, data-density
src/i18n/dictionary.ts                # extend with the strings used (see DICT below)
src/lib/sections.ts                   # ensure sections list matches
src/lib/mock-articles.ts              # already exists — keep, just consume from it
```

## DESIGN SYSTEM (PORT THESE TOKENS EXACTLY)

Add these as CSS variables on `:root` (and `[data-theme="dark"]`, `[data-theme="sepia"]` selectors) in `src/app/globals.css`. Then expose a few as Tailwind theme extensions if convenient — but **the components below use raw CSS classes, not Tailwind utilities**, so it's fine to keep the CSS file and import it.

```css
:root {
  --bg: oklch(0.97 0.012 80);
  --bg-2: oklch(0.94 0.014 80);
  --bg-3: oklch(0.90 0.016 75);
  --ink: oklch(0.22 0.012 60);
  --ink-2: oklch(0.42 0.012 60);
  --ink-3: oklch(0.58 0.012 60);
  --rule: oklch(0.22 0.012 60 / 0.18);
  --rule-strong: oklch(0.22 0.012 60 / 0.34);
  --accent: oklch(0.45 0.14 25);
  --accent-2: oklch(0.45 0.10 240);

  --serif: 'Source Serif 4', Georgia, serif;
  --sans: 'Inter', system-ui, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  --urdu: 'Noto Naskh Arabic', serif;

  --container: 1280px;
  --gutter: 28px;
  --radius: 0px;
  --density: 1;
}

[data-theme="dark"] {
  --bg: oklch(0.18 0.008 60);
  --bg-2: oklch(0.22 0.010 60);
  --bg-3: oklch(0.28 0.012 60);
  --ink: oklch(0.94 0.010 80);
  --ink-2: oklch(0.74 0.010 70);
  --ink-3: oklch(0.58 0.010 70);
  --rule: oklch(0.94 0.010 80 / 0.16);
  --rule-strong: oklch(0.94 0.010 80 / 0.30);
  --accent: oklch(0.65 0.14 25);
  --accent-2: oklch(0.70 0.10 240);
}

[data-theme="sepia"] {
  --bg: oklch(0.94 0.038 75);
  --bg-2: oklch(0.90 0.044 70);
  --bg-3: oklch(0.85 0.050 65);
  --ink: oklch(0.26 0.030 50);
  --ink-2: oklch(0.45 0.028 55);
  --ink-3: oklch(0.58 0.024 55);
  --rule: oklch(0.26 0.030 50 / 0.22);
  --rule-strong: oklch(0.26 0.030 50 / 0.36);
  --accent: oklch(0.45 0.14 30);
  --accent-2: oklch(0.45 0.10 230);
}

[data-serif="newsreader"] { --serif: 'Newsreader', Georgia, serif; }
[data-density="comfy"]    { --density: 1.15; }
[data-density="compact"]  { --density: 0.9; }
```

Fonts (load via `next/font/google` in `app/layout.tsx`): **Source Serif 4**, **Inter**, **JetBrains Mono**, **Newsreader**, **Noto Naskh Arabic**.

## VISUAL VOCABULARY

- Newsroom paper feel: warm off-white background, italic Source Serif masthead, Inter for UI/meta, JetBrains Mono for kickers and bylines.
- A subtle two-layer dot pattern overlays the page (paper texture).
- All borders are 1px hairlines using `--rule` / `--rule-strong`. No rounded corners (`--radius: 0`).
- Section heads: title left, "More →" right, separated by a 2px ink underline.
- Eyebrows: mono, uppercase, 11px, 0.10em tracking. Use `.rk-eyebrow--accent` for the colored variant.
- Hero has 3 variants the user can switch between: `editorial` (lead photo + secondary rail), `magazine` (3:4 photo + giant headline), `wire` (4-up wire roundup).
- Breaking ticker: `--accent` background, white pulse dot, italic serif headline, mono timestamp; rotates every 5s.
- Opinion strip is a 3-column band on `--bg-2` with mono kickers, italic serif titles, dek, and a circular initials avatar.
- Newsletter band is full-bleed `--ink` background with a giant ghost "RK" watermark.

## FILE-BY-FILE PORT INSTRUCTIONS

For each component, take the JSX from the reference below, convert to TSX (typed props), and split classes onto styled elements that map to the CSS classnames (`rk-*`). Don't try to "Tailwindify" the styles — keep the `rk-*` classes and the CSS file. The class system is intentionally vanilla so all three theme/serif/density toggles work via `data-*` on `<html>`.

Wire the theme/serif/density/accent-hue toggles in `theme-root.tsx`:
```ts
useEffect(() => {
  const html = document.documentElement;
  html.dataset.theme = theme;          // 'light' | 'dark' | 'sepia'
  html.dataset.serif = serif;          // 'source' | 'newsreader'
  html.dataset.density = density;      // 'compact' | 'default' | 'comfy'
  html.style.setProperty('--accent',
    theme === 'dark'
      ? `oklch(0.65 0.14 ${accentHue})`
      : `oklch(0.45 0.14 ${accentHue})`);
}, [theme, serif, density, accentHue]);
```

For locale: set `<html lang>` and `dir="rtl"` when locale is `ur`.

---

## REFERENCE CODE — VERBATIM

Below is the full prototype. **All files under one project root.** Translate to the codebase as described above.

### `styles.css` (≈860 lines — port to `src/app/globals.css`)

```css
/* Rising Kashmir redesign — original editorial design.
   Warm paper palette, strong serif headlines, Inter for UI/meta. */

@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');

/* === tokens === */
:root {
  --bg: oklch(0.97 0.012 80);
  --bg-2: oklch(0.94 0.014 80);
  --bg-3: oklch(0.90 0.016 75);
  --ink: oklch(0.22 0.012 60);
  --ink-2: oklch(0.42 0.012 60);
  --ink-3: oklch(0.58 0.012 60);
  --rule: oklch(0.22 0.012 60 / 0.18);
  --rule-strong: oklch(0.22 0.012 60 / 0.34);
  --accent: oklch(0.45 0.14 25);
  --accent-2: oklch(0.45 0.10 240);
  --serif: 'Source Serif 4', Georgia, serif;
  --sans: 'Inter', system-ui, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  --urdu: 'Noto Naskh Arabic', serif;
  --container: 1280px;
  --gutter: 28px;
  --radius: 0px;
  --density: 1;
}
[data-theme="dark"] {
  --bg: oklch(0.18 0.008 60); --bg-2: oklch(0.22 0.010 60); --bg-3: oklch(0.28 0.012 60);
  --ink: oklch(0.94 0.010 80); --ink-2: oklch(0.74 0.010 70); --ink-3: oklch(0.58 0.010 70);
  --rule: oklch(0.94 0.010 80 / 0.16); --rule-strong: oklch(0.94 0.010 80 / 0.30);
  --accent: oklch(0.65 0.14 25); --accent-2: oklch(0.70 0.10 240);
}
[data-theme="sepia"] {
  --bg: oklch(0.94 0.038 75); --bg-2: oklch(0.90 0.044 70); --bg-3: oklch(0.85 0.050 65);
  --ink: oklch(0.26 0.030 50); --ink-2: oklch(0.45 0.028 55); --ink-3: oklch(0.58 0.024 55);
  --rule: oklch(0.26 0.030 50 / 0.22); --rule-strong: oklch(0.26 0.030 50 / 0.36);
  --accent: oklch(0.45 0.14 30); --accent-2: oklch(0.45 0.10 230);
}
[data-serif="newsreader"] { --serif: 'Newsreader', Georgia, serif; }
[data-density="comfy"]    { --density: 1.15; }
[data-density="compact"]  { --density: 0.9; }

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--bg); color: var(--ink);
  font-family: var(--sans); font-size: 15px; line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "ss01", "cv11";
}
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; text-align: inherit; }
ul { list-style: none; padding: 0; margin: 0; }
input { font: inherit; color: inherit; }
.is-urdu, [dir="rtl"] .rk-masthead__title { font-family: var(--urdu) !important; }

/* paper texture */
body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    radial-gradient(1px 1px at 10% 20%, oklch(0.5 0.02 60 / 0.04) 1px, transparent 0),
    radial-gradient(1px 1px at 70% 80%, oklch(0.5 0.02 60 / 0.04) 1px, transparent 0);
  background-size: 7px 7px, 11px 11px; mix-blend-mode: multiply;
}
.rk-app { position: relative; z-index: 1; }

/* containers */
.rk-util__inner, .rk-masthead__inner, .rk-nav__inner, .rk-breaking__inner,
.rk-hero__grid, .rk-hero__mag, .rk-hero__wire,
.rk-opinion__inner, .rk-strip__inner, .rk-news__inner, .rk-footer__inner,
.rk-article, .rk-sectionpage, .rk-epaper, .rk-search {
  max-width: var(--container); margin: 0 auto;
  padding-left: var(--gutter); padding-right: var(--gutter);
}

/* eyebrow + byline + image */
.rk-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.10em;
  color: var(--ink-3); text-transform: uppercase;
}
.rk-eyebrow--accent { color: var(--accent); }
.rk-eyebrow__dot { font-size: 6px; }
.rk-byline { margin: 6px 0 0; font-family: var(--mono); font-size: 11.5px; color: var(--ink-3); letter-spacing: 0.02em; }
.rk-byline__by { color: var(--ink-3); }
.rk-byline__name { color: var(--ink-2); font-weight: 500; }
.rk-byline__sep { margin: 0 6px; opacity: 0.5; }
.rk-img { background: var(--bg-3); overflow: hidden; position: relative; }
.rk-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
.rk-img--16x10 { aspect-ratio: 16/10; }
.rk-img--16x9  { aspect-ratio: 16/9; }
.rk-img--4x3   { aspect-ratio: 4/3; }
.rk-img--3x4   { aspect-ratio: 3/4; }
.rk-img--1x1   { aspect-ratio: 1/1; }
button:hover .rk-img img, .rk-tile__media:hover img { transform: scale(1.02); }

/* utility bar */
.rk-util { background: var(--bg-2); border-bottom: 1px solid var(--rule); font-family: var(--mono); font-size: 11px; color: var(--ink-2); }
.rk-util__inner { display: flex; justify-content: space-between; align-items: center; min-height: 34px; padding-top: 6px; padding-bottom: 6px; flex-wrap: wrap; gap: 8px 16px; white-space: nowrap; }
.rk-util__left { display: flex; align-items: center; gap: 12px; letter-spacing: 0.06em; flex-wrap: wrap; }
.rk-util__date { text-transform: uppercase; white-space: nowrap; }
.rk-util__weather { white-space: nowrap; color: var(--ink-3); }
.rk-util__link { white-space: nowrap; color: var(--ink-2); }
.rk-util__link:hover { color: var(--ink); }
.rk-pill { white-space: nowrap; border: 1px solid var(--rule-strong); padding: 3px 9px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; color: var(--ink-2); }
.rk-pill.is-on { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.rk-util__dot { color: var(--accent); font-size: 6px; }
.rk-util__right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.rk-util__sep { color: var(--ink-3); opacity: 0.5; }
.rk-util__sub { padding: 5px 11px; background: var(--ink); color: var(--bg); letter-spacing: 0.10em; text-transform: uppercase; }
.rk-util__sub:hover { background: var(--accent); }

/* masthead */
.rk-masthead { background: var(--bg); padding: calc(28px * var(--density)) 0 calc(20px * var(--density)); border-bottom: 1px solid var(--rule); position: relative; }
.rk-masthead::before, .rk-masthead::after { content: ""; position: absolute; left: var(--gutter); right: var(--gutter); height: 1px; background: var(--rule-strong); }
.rk-masthead::before { top: 8px; }
.rk-masthead::after  { bottom: 0; }
.rk-masthead__inner { display: grid; grid-template-columns: 200px minmax(0, 1fr) 200px; align-items: center; gap: 20px; }
.rk-stamp { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.10em; color: var(--ink-3); line-height: 1.7; }
.rk-stamp--right { text-align: right; }
.rk-stamp__line--em { color: var(--accent); font-weight: 500; }
.rk-masthead__center { text-align: center; min-width: 0; display: flex; flex-direction: column; align-items: center; }
.rk-masthead__eyebrow { margin: 0 0 4px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; color: var(--ink-3); text-transform: uppercase; }
.rk-masthead__title {
  display: inline-block; font-family: var(--serif); font-weight: 600;
  font-size: clamp(36px, 5.6vw, 60px); line-height: 1.15; letter-spacing: -0.025em;
  white-space: nowrap; max-width: 100%; padding: 4px 0 8px; color: var(--ink);
  font-style: italic; font-feature-settings: "ss01"; margin: 6px 0 10px;
}
.rk-masthead__title.is-urdu { font-style: normal; font-size: clamp(40px, 7vw, 68px); }
.rk-masthead__rule { display: flex; align-items: center; justify-content: center; gap: 10px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em; color: var(--ink-3); }
.rk-masthead__rule-line { flex: 1; max-width: 80px; height: 1px; background: var(--rule-strong); }
.rk-masthead__rule-dot  { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }

/* primary nav */
.rk-nav { background: var(--bg); border-bottom: 2px solid var(--ink); position: sticky; top: 0; z-index: 30; }
.rk-nav__inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; height: 48px; }
.rk-nav__list { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.rk-nav__link { font-family: var(--sans); font-size: 13px; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; padding: 10px 14px; color: var(--ink); position: relative; }
.rk-nav__link:hover, .rk-nav__link.is-current { color: var(--accent); }
.rk-nav__link.is-current::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: -2px; height: 2px; background: var(--accent); }
.rk-nav__more { position: relative; }
.rk-nav__pop { position: absolute; top: 100%; right: 0; background: var(--bg); border: 1px solid var(--rule-strong); min-width: 200px; padding: 8px; z-index: 50; box-shadow: 0 18px 40px -20px oklch(0.2 0.02 60 / 0.3); }
.rk-nav__pop-item { display: block; width: 100%; text-align: left; padding: 9px 12px; font-size: 13px; color: var(--ink-2); }
.rk-nav__pop-item:hover { background: var(--bg-2); color: var(--ink); }
.rk-nav__search { position: relative; flex: 0 0 240px; }
.rk-nav__search input { width: 100%; padding: 7px 12px 7px 30px; background: var(--bg-2); border: 1px solid var(--rule); font-size: 13px; outline: none; }
.rk-nav__search input:focus { border-color: var(--ink); background: var(--bg); }
.rk-nav__search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--ink-3); font-size: 14px; }

/* breaking ticker */
.rk-breaking { background: var(--accent); color: var(--bg); }
.rk-breaking__inner { display: flex; align-items: center; gap: 16px; min-height: 38px; padding-top: 6px; padding-bottom: 6px; flex-wrap: nowrap; }
.rk-breaking__tag { display: inline-flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; font-weight: 600; flex-shrink: 0; }
.rk-breaking__pulse { width: 8px; height: 8px; background: var(--bg); border-radius: 50%; animation: rk-pulse 1.4s ease-in-out infinite; }
@keyframes rk-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.7); } }
.rk-breaking__dots { display: flex; gap: 4px; flex-shrink: 0; }
.rk-breaking__dots li { width: 14px; height: 2px; background: oklch(1 0 0 / 0.35); }
.rk-breaking__dots li.is-on { background: var(--bg); }
.rk-breaking__title { font-family: var(--serif); font-style: italic; font-size: 15px; font-weight: 500; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--bg); animation: rk-fadein 0.4s ease; }
.rk-breaking__title:hover { text-decoration: underline; }
.rk-breaking__time { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.06em; opacity: 0.85; flex-shrink: 0; white-space: nowrap; }
@keyframes rk-fadein { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: none; } }

/* hero */
.rk-hero { padding: calc(36px * var(--density)) 0 calc(28px * var(--density)); }
.rk-hero__grid { display: grid; gap: 36px; grid-template-columns: minmax(0, 2.2fr) minmax(0, 1fr); align-items: start; }
@media (max-width: 900px) { .rk-hero__grid { grid-template-columns: 1fr; } }

.rk-lead { display: grid; gap: 20px; grid-template-columns: 1.3fr 1fr; align-items: start; }
@media (max-width: 700px) { .rk-lead { grid-template-columns: 1fr; } }
.rk-lead__media { display: block; width: 100%; }
.rk-lead__body { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.rk-lead__title { font-family: var(--serif); font-weight: 600; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.18; letter-spacing: -0.02em; color: var(--ink); margin: 4px 0; text-wrap: balance; padding: 4px 0 6px; display: block; }
.rk-lead__title:hover { text-decoration: underline; cursor: pointer; }
.rk-lead__title.is-urdu { line-height: 1.4; letter-spacing: 0; }
.rk-lead__dek { font-family: var(--serif); font-style: italic; font-size: 17px; line-height: 1.5; color: var(--ink-2); margin: 0; text-wrap: pretty; display: block; padding-top: 4px; }

.rk-hero__rail { display: flex; flex-direction: column; gap: 22px; }
.rk-rail-head { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em; color: var(--ink-3); margin-bottom: 4px; }
.rk-rail-head__line { flex: 1; height: 1px; background: var(--rule-strong); }

.rk-secondary { padding-bottom: 18px; border-bottom: 1px solid var(--rule); }
.rk-secondary:last-child { border-bottom: 0; padding-bottom: 0; }
.rk-secondary__title { font-family: var(--serif); font-size: 19px; font-weight: 600; line-height: 1.22; letter-spacing: -0.01em; color: var(--ink); margin: 6px 0; cursor: pointer; text-wrap: balance; }
.rk-secondary__title:hover { text-decoration: underline; }
.rk-secondary__title.is-urdu { line-height: 1.5; }

/* magazine variant */
.rk-hero--mag .rk-hero__mag { display: grid; gap: 40px; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); align-items: start; }
@media (max-width: 900px) { .rk-hero--mag .rk-hero__mag { grid-template-columns: 1fr; } }
.rk-hero__mag-media { display: block; }
.rk-hero__mag-title { font-family: var(--serif); font-weight: 700; font-size: clamp(34px, 4.6vw, 60px); line-height: 1.02; letter-spacing: -0.025em; color: var(--ink); margin: 12px 0 8px; cursor: pointer; text-wrap: balance; }
.rk-hero__mag-title:hover { text-decoration: underline; }
.rk-hero__mag-title.is-urdu { line-height: 1.4; letter-spacing: 0; }
.rk-hero__mag-dek { font-family: var(--serif); font-style: italic; font-size: 19px; line-height: 1.4; color: var(--ink-2); margin: 0 0 4px; }
.rk-hero__mag-stack { display: grid; gap: 18px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--rule-strong); }

/* wire variant */
.rk-section-rule { display: flex; align-items: center; justify-content: center; gap: 12px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em; color: var(--ink-3); margin: 0 0 24px; }
.rk-section-rule::before, .rk-section-rule::after { content: ""; flex: 1; height: 1px; background: var(--rule-strong); }
.rk-hero--wire .rk-hero__wire { display: grid; gap: 24px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
@media (max-width: 900px) { .rk-hero--wire .rk-hero__wire { grid-template-columns: repeat(2, 1fr); } }
.rk-hero__wire-item { padding: 0 16px; border-left: 1px solid var(--rule); }
.rk-hero__wire-item:first-child { border-left: 0; padding-left: 0; }

/* opinion strip */
.rk-opinion { background: var(--bg-2); border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); padding: calc(48px * var(--density)) 0; position: relative; }
.rk-opinion__head { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: end; margin-bottom: 32px; }
@media (max-width: 800px) { .rk-opinion__head { grid-template-columns: 1fr; } }
.rk-opinion__kicker { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; color: var(--accent); margin: 0 0 8px; text-transform: uppercase; }
.rk-opinion__title { font-family: var(--serif); font-weight: 500; font-size: clamp(28px, 3.5vw, 44px); line-height: 1.05; letter-spacing: -0.02em; margin: 0; font-style: italic; }
.rk-opinion__sub { font-family: var(--serif); font-style: italic; color: var(--ink-2); font-size: 17px; margin: 0; max-width: 380px; justify-self: end; text-align: right; text-wrap: pretty; }
@media (max-width: 800px) { .rk-opinion__sub { justify-self: start; text-align: left; } }
.rk-opinion__grid { display: grid; gap: 0; grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 900px) { .rk-opinion__grid { grid-template-columns: 1fr; } }
.rk-col { padding: 28px; border-left: 1px solid var(--rule-strong); display: flex; flex-direction: column; gap: 10px; background: var(--bg); position: relative; }
.rk-col:first-child { border-left: 0; }
@media (max-width: 900px) { .rk-col { border-left: 0; border-top: 1px solid var(--rule-strong); } .rk-col:first-child { border-top: 0; } }
.rk-col__num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; color: var(--ink-3); }
.rk-col__column { font-family: var(--mono); font-size: 11px; letter-spacing: 0.10em; color: var(--accent); text-transform: uppercase; margin: 0; }
.rk-col__title { font-family: var(--serif); font-weight: 500; font-size: 22px; line-height: 1.18; letter-spacing: -0.01em; color: var(--ink); margin: 4px 0 0; font-style: italic; cursor: pointer; text-wrap: balance; }
.rk-col__title:hover { text-decoration: underline; }
.rk-col__title.is-urdu { font-style: normal; line-height: 1.5; }
.rk-col__dek { font-family: var(--sans); font-size: 13.5px; line-height: 1.55; color: var(--ink-2); margin: 0 0 8px; text-wrap: pretty; }
.rk-col__author { display: flex; align-items: center; gap: 12px; margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); }
.rk-col__avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--bg-3); border: 1px solid var(--rule-strong); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 13px; font-weight: 500; color: var(--ink-2); letter-spacing: 0.05em; flex-shrink: 0; }
.rk-col__name { margin: 0; font-size: 13px; font-weight: 600; color: var(--ink); }
.rk-col__meta { margin: 0; font-family: var(--mono); font-size: 11px; color: var(--ink-3); letter-spacing: 0.05em; }

/* section strip */
.rk-strip { padding: calc(40px * var(--density)) 0; border-bottom: 1px solid var(--rule); }
.rk-strip__head { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; padding-bottom: 14px; border-bottom: 2px solid var(--ink); margin-bottom: 24px; }
.rk-strip__title { font-family: var(--serif); font-weight: 600; font-size: 24px; letter-spacing: -0.01em; margin: 0; display: inline-flex; align-items: baseline; gap: 12px; }
.rk-strip__title.is-urdu { font-family: var(--urdu); }
.rk-strip__num { color: var(--accent); font-size: 18px; }
.rk-strip__more { font-family: var(--mono); font-size: 11px; letter-spacing: 0.10em; text-transform: uppercase; color: var(--accent); flex-shrink: 0; }
.rk-strip__more:hover { color: var(--ink); }
.rk-strip__grid { display: grid; gap: 28px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
@media (max-width: 1000px) { .rk-strip__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .rk-strip__grid { grid-template-columns: 1fr; } }

.rk-tile { display: flex; flex-direction: column; gap: 8px; }
.rk-tile__media { display: block; margin-bottom: 4px; }
.rk-tile__title { font-family: var(--serif); font-weight: 600; font-size: 17px; line-height: 1.25; color: var(--ink); margin: 4px 0 0; cursor: pointer; text-wrap: balance; }
.rk-tile__title:hover { text-decoration: underline; }
.rk-tile__title.is-urdu { line-height: 1.5; }

.rk-strip__list { display: flex; flex-direction: column; gap: 0; }
.rk-strip__list > li { border-bottom: 1px solid var(--rule); }
.rk-strip__list > li:last-child { border-bottom: 0; }

.rk-thumb { display: grid; grid-template-columns: 36px 120px 1fr; gap: 16px; align-items: start; padding: 16px 0; }
@media (max-width: 600px) { .rk-thumb { grid-template-columns: 28px 92px 1fr; gap: 12px; } }
.rk-thumb__num { font-family: var(--serif); font-style: italic; font-size: 26px; color: var(--ink-3); font-weight: 400; line-height: 1; padding-top: 4px; }
.rk-thumb__media { display: block; }
.rk-thumb__title { font-family: var(--serif); font-weight: 600; font-size: 17px; line-height: 1.25; color: var(--ink); margin: 0; cursor: pointer; text-wrap: balance; }
.rk-thumb__title:hover { text-decoration: underline; }

/* newsletter band */
.rk-news { background: var(--ink); color: var(--bg); padding: calc(56px * var(--density)) 0; position: relative; overflow: hidden; }
.rk-news::before { content: "RK"; position: absolute; right: -40px; bottom: -80px; font-family: var(--serif); font-style: italic; font-size: 320px; font-weight: 700; color: var(--bg); opacity: 0.04; line-height: 1; }
.rk-news__inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: center; position: relative; }
@media (max-width: 800px) { .rk-news__inner { grid-template-columns: 1fr; } }
.rk-news__kicker { font-family: var(--mono); font-size: 11px; letter-spacing: 0.20em; color: var(--accent); margin: 0 0 14px; text-transform: uppercase; }
.rk-news__title { font-family: var(--serif); font-weight: 500; font-size: clamp(28px, 3.4vw, 42px); line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 12px; font-style: italic; text-wrap: balance; }
.rk-news__dek { font-family: var(--serif); font-size: 16px; line-height: 1.5; color: oklch(1 0 0 / 0.7); margin: 0; }
.rk-news__form { display: flex; align-items: stretch; border: 1px solid oklch(1 0 0 / 0.3); }
.rk-news__form input { flex: 1; background: transparent; border: 0; outline: none; padding: 16px 18px; font-size: 15px; color: var(--bg); }
.rk-news__form input::placeholder { color: oklch(1 0 0 / 0.5); }
.rk-news__form button { background: var(--bg); color: var(--ink); padding: 16px 26px; font-family: var(--mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; }
.rk-news__form button:hover { background: var(--accent); color: var(--bg); }
.rk-news__done { font-family: var(--serif); font-style: italic; color: oklch(0.85 0.05 130); font-size: 17px; margin: 0; }

/* footer */
.rk-footer { background: var(--bg-2); border-top: 1px solid var(--rule); padding: 60px 0 0; }
.rk-footer__inner { display: grid; grid-template-columns: 1.2fr 2fr; gap: 60px; padding-bottom: 48px; }
@media (max-width: 800px) { .rk-footer__inner { grid-template-columns: 1fr; gap: 40px; } }
.rk-footer__title { font-family: var(--serif); font-style: italic; font-size: 32px; font-weight: 600; line-height: 1; margin: 0 0 16px; color: var(--ink); }
.rk-footer__addr { font-family: var(--mono); font-size: 12px; color: var(--ink-2); margin: 0 0 12px; line-height: 1.6; letter-spacing: 0.02em; }
.rk-footer__addr--alt { color: var(--ink-3); }
.rk-footer__cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
@media (max-width: 600px) { .rk-footer__cols { grid-template-columns: 1fr 1fr; } }
.rk-footer__h { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin: 0 0 14px; }
.rk-footer__cols ul li { margin: 0 0 9px; }
.rk-footer__cols ul button { font-size: 13.5px; color: var(--ink-2); }
.rk-footer__cols ul button:hover { color: var(--ink); text-decoration: underline; }
.rk-footer__bottom { border-top: 1px solid var(--rule); padding: 20px var(--gutter); max-width: var(--container); margin: 0 auto; display: flex; justify-content: space-between; gap: 16px; font-family: var(--mono); font-size: 11px; color: var(--ink-3); letter-spacing: 0.04em; }
@media (max-width: 600px) { .rk-footer__bottom { flex-direction: column; } }

/* article reader */
.rk-article { padding: 32px var(--gutter) 64px; max-width: 1180px; }
.rk-article__back { font-family: var(--mono); font-size: 12px; letter-spacing: 0.10em; text-transform: uppercase; color: var(--ink-2); margin-bottom: 24px; }
.rk-article__back:hover { color: var(--accent); }
.rk-article__head { max-width: 760px; margin: 0 auto 28px; }
.rk-article__title { font-family: var(--serif); font-weight: 700; font-size: clamp(34px, 4.4vw, 56px); line-height: 1.04; letter-spacing: -0.025em; color: var(--ink); margin: 14px 0; text-wrap: balance; }
.rk-article__title.is-urdu { line-height: 1.4; letter-spacing: 0; }
.rk-article__dek { font-family: var(--serif); font-style: italic; font-size: 21px; line-height: 1.45; color: var(--ink-2); margin: 0 0 24px; text-wrap: pretty; }
.rk-article__byline { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
.rk-article__author { margin: 0; font-size: 14px; font-weight: 600; }
.rk-article__meta { margin: 0; font-family: var(--mono); font-size: 11px; color: var(--ink-3); letter-spacing: 0.05em; }
.rk-article__tools { margin-left: auto; display: flex; gap: 6px; }
.rk-article__tools button { min-width: 36px; height: 36px; padding: 0 10px; border: 1px solid var(--rule-strong); font-family: var(--mono); font-size: 12px; color: var(--ink-2); }
.rk-article__tools button:hover { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.rk-article__hero { margin: 0 0 36px; max-width: 1180px; }
.rk-article__body { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 56px; max-width: 1080px; margin: 0 auto; }
@media (max-width: 800px) { .rk-article__body { grid-template-columns: 1fr; gap: 24px; } }
.rk-article__rail { position: sticky; top: 64px; align-self: start; font-family: var(--sans); }
.rk-article__rail-h { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin: 0 0 12px; }
.rk-article__rail-h--mt { margin-top: 28px; }
.rk-article__rail ul li { font-size: 13.5px; line-height: 1.4; padding: 8px 0; border-bottom: 1px solid var(--rule); color: var(--ink-2); }
.rk-article__related li button { font-family: var(--serif); font-size: 14.5px; font-weight: 500; color: var(--ink); line-height: 1.3; text-align: left; }
.rk-article__related li button:hover { color: var(--accent); }
.rk-article__text { max-width: 660px; font-family: var(--serif); font-size: 19px; line-height: 1.7; color: var(--ink); }
.rk-article__text p { margin: 0 0 22px; text-wrap: pretty; }
.rk-article__text p.rk-article__lead::first-letter { font-weight: 700; font-size: 4.4em; float: left; line-height: 0.9; padding: 8px 12px 0 0; color: var(--accent); font-family: var(--serif); }
.rk-article__quote { border-left: 3px solid var(--accent); padding: 8px 0 8px 24px; margin: 32px 0; font-family: var(--serif); font-style: italic; font-size: 23px; line-height: 1.4; color: var(--ink); }
.rk-article__quote cite { display: block; margin-top: 14px; font-family: var(--mono); font-size: 12px; font-style: normal; letter-spacing: 0.05em; color: var(--ink-3); }
.rk-article__more { margin-top: 56px; }

/* section page */
.rk-sectionpage { padding: 32px var(--gutter) 64px; }
.rk-sectionpage__head { border-bottom: 2px solid var(--ink); padding-bottom: 20px; margin-bottom: 32px; }
.rk-sectionpage__kicker { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; color: var(--accent); margin: 0 0 4px; }
.rk-sectionpage__title { font-family: var(--serif); font-weight: 600; font-size: clamp(40px, 5.5vw, 72px); line-height: 1; letter-spacing: -0.025em; margin: 0; font-style: italic; }
.rk-sectionpage__count { font-family: var(--mono); font-size: 12px; color: var(--ink-3); margin: 12px 0 0; }
.rk-sectionpage__grid { display: grid; gap: 32px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 48px; }
@media (max-width: 1000px) { .rk-sectionpage__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .rk-sectionpage__grid { grid-template-columns: 1fr; } }

/* e-paper */
.rk-epaper { padding: 32px var(--gutter) 64px; }
.rk-epaper__shelf { display: grid; gap: 32px; grid-template-columns: repeat(3, 1fr); margin-top: 32px; }
@media (max-width: 800px) { .rk-epaper__shelf { grid-template-columns: 1fr 1fr; } }
.rk-epaper__page { display: block; text-align: center; }
.rk-epaper__sheet { background: var(--bg-2); border: 1px solid var(--rule-strong); aspect-ratio: 3/4; padding: 18px; display: flex; flex-direction: column; box-shadow: 0 18px 40px -20px oklch(0.2 0.02 60 / 0.25); transition: transform .2s; }
.rk-epaper__page:hover .rk-epaper__sheet { transform: translateY(-4px); }
.rk-epaper__masthead { font-family: var(--serif); font-style: italic; font-weight: 600; font-size: 18px; text-align: center; border-bottom: 2px solid var(--ink); padding-bottom: 8px; margin-bottom: 12px; }
.rk-epaper__lines { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.rk-epaper__lines span { height: 5px; background: var(--rule-strong); }
.rk-epaper__label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.10em; color: var(--ink-3); margin: 12px 0 0; text-transform: uppercase; }

.rk-search { padding: 32px var(--gutter) 64px; }
.rk-empty { padding: 80px var(--gutter); text-align: center; font-family: var(--serif); font-style: italic; color: var(--ink-2); }

[dir="rtl"] .rk-thumb__num { text-align: right; }
```

### `app.jsx` — top-level shell (port to `src/app/[locale]/page.tsx` + a `RKApp` client component)

```jsx
const { useState, useEffect } = React;

function App() {
  const [theme, setTheme] = useState('light');     // 'light' | 'dark' | 'sepia'
  const [serif, setSerif] = useState('source');    // 'source' | 'newsreader'
  const [density, setDensity] = useState('default');
  const [accentHue, setAccentHue] = useState(25);
  const [heroVariant, setHeroVariant] = useState('editorial'); // editorial|magazine|wire
  const [showBreaking, setShowBreaking] = useState(true);
  const [locale, setLocale] = useState('en');
  const [route, setRoute] = useState({ view: 'home' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.serif = serif;
    root.dataset.density = density;
    root.style.setProperty('--accent',
      theme === 'dark'
        ? `oklch(0.65 0.14 ${accentHue})`
        : `oklch(0.45 0.14 ${accentHue})`);
  }, [theme, serif, density, accentHue]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ur' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route]);

  const dict = window.RK_DATA.DICT[locale];
  const ARTS = window.RK_DATA.ARTICLES;
  const lead = ARTS[0];
  const secondaries = ARTS.slice(1, 4);
  const breaking = ARTS.filter(a => a.is_breaking);
  const opinion = ARTS.filter(a => a.section === 'opinion' && a.column).slice(0, 3);
  const kashmir = ARTS.filter(a => a.section === 'kashmir').slice(0, 4);
  const sports = ARTS.filter(a => a.section === 'sports').slice(0, 3);
  const world = ARTS.filter(a => a.section === 'world').slice(0, 3);

  const onNav = r => { setSearch(''); setRoute(r); };
  const currentSection = route.view === 'section' ? route.section : null;

  return (
    <div className="rk-app" data-screen-label={route.view}>
      <UtilityBar locale={locale} dict={dict} onLocale={setLocale}
                  theme={theme} onTheme={cycleTheme} onNav={onNav} />
      <Masthead locale={locale} dict={dict} onNav={onNav} edition="LATE EDITION" />
      <PrimaryNav locale={locale} dict={dict} current={currentSection}
                  onNav={onNav} search={search} onSearch={setSearch} />
      {showBreaking && route.view === 'home' && (
        <BreakingTicker items={breaking} locale={locale} onNav={onNav} />
      )}
      <main>
        {search.trim().length > 1 ? (
          <SearchResults query={search} locale={locale} theme={theme} onNav={onNav} />
        ) : route.view === 'home' ? (
          <>
            <Hero lead={lead} secondaries={secondaries} locale={locale}
                  theme={theme} onNav={onNav} variant={heroVariant} />
            <OpinionStrip items={opinion} locale={locale} theme={theme}
                          onNav={onNav} dict={dict} />
            <SectionStrip title={sectionLabel('kashmir', locale)} sectionSlug="kashmir"
                          articles={kashmir} layout="four-up" locale={locale}
                          theme={theme} onNav={onNav} />
            <NewsletterBand locale={locale} />
          </>
        ) : route.view === 'section' ? (
          <SectionPage section={route.section} locale={locale} theme={theme}
                       onNav={onNav} dict={dict} />
        ) : route.view === 'article' ? (
          <ArticleReader slug={route.slug} locale={locale} theme={theme}
                         dict={dict} onNav={onNav} />
        ) : route.view === 'epaper' ? (
          <EpaperPage onNav={onNav} />
        ) : null}
      </main>
      <Footer locale={locale} dict={dict} onNav={onNav} />
    </div>
  );

  function cycleTheme() {
    const order = ['light', 'dark', 'sepia'];
    setTheme(order[(order.indexOf(theme) + 1) % order.length]);
  }
}
```

In Next.js: replace the in-state `route` with the existing app-router URLs (`/[locale]`, `/[locale]/section/[slug]`, `/[locale]/article/[slug]`, `/[locale]/epaper`). Use `useRouter().push()` in place of `setRoute`. The component shape stays the same.

### `components.jsx` — all view components (port one-to-one to `src/components/*.tsx`)

```jsx
const { useState, useEffect, useRef } = React;

// helpers ───────────────────────────────────────────────────────────────────
function fmtDateline(locale) {
  const d = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  if (locale === 'ur') return d.toLocaleDateString('ur-IN', opts);
  return d.toLocaleDateString('en-IN', opts).toUpperCase();
}
function relTime(iso, locale) {
  const t = new Date(iso).getTime();
  const diffH = Math.round((Date.now() - t) / 36e5);
  if (locale === 'ur') {
    if (diffH < 1) return 'ابھی ابھی';
    if (diffH < 24) return `${diffH} گھنٹے قبل`;
    return `${Math.round(diffH / 24)} دن قبل`;
  }
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.round(diffH / 24)}d ago`;
}
function pickTitle(a, locale) { return locale === 'ur' && a.title_ur ? a.title_ur : a.title; }
function sectionLabel(slug, locale) {
  const s = window.RK_DATA.SECTIONS.find(x => x.slug === slug);
  if (!s) return slug;
  return locale === 'ur' ? s.label_ur : s.label;
}

// UtilityBar ────────────────────────────────────────────────────────────────
function UtilityBar({ locale, dict, onLocale, theme, onTheme, onNav }) {
  return (
    <div className="rk-util">
      <div className="rk-util__inner">
        <div className="rk-util__left">
          <span className="rk-util__date">{fmtDateline(locale)}</span>
          <span className="rk-util__dot">●</span>
          <span className="rk-util__weather">{dict.weather}</span>
        </div>
        <div className="rk-util__right">
          <button className={`rk-pill ${locale === 'en' ? 'is-on' : ''}`}
                  onClick={() => onLocale('en')} aria-pressed={locale === 'en'}>EN</button>
          <button className={`rk-pill ${locale === 'ur' ? 'is-on' : ''}`}
                  onClick={() => onLocale('ur')} aria-pressed={locale === 'ur'}>اردو</button>
          <span className="rk-util__sep">│</span>
          <button className="rk-util__link" onClick={() => onNav({ view: 'epaper' })}>E-Paper</button>
          <button className="rk-util__link" onClick={onTheme} title="Toggle theme">
            {theme === 'dark' ? '☾ Dark' : theme === 'sepia' ? '✦ Sepia' : '☼ Light'}
          </button>
          <button className="rk-util__sub">{dict.subscribe}</button>
        </div>
      </div>
    </div>
  );
}

// Masthead ──────────────────────────────────────────────────────────────────
function Masthead({ locale, dict, onNav, edition }) {
  return (
    <header className="rk-masthead">
      <div className="rk-masthead__inner">
        <div className="rk-masthead__sidebar rk-masthead__sidebar--left">
          <div className="rk-stamp">
            <div className="rk-stamp__line">VOL. XIX</div>
            <div className="rk-stamp__line">№ 124</div>
            <div className="rk-stamp__line rk-stamp__line--em">SRINAGAR</div>
          </div>
        </div>
        <div className="rk-masthead__center">
          <p className="rk-masthead__eyebrow">{dict.eyebrow}</p>
          <button className={`rk-masthead__title ${locale === 'ur' ? 'is-urdu' : ''}`}
                  onClick={() => onNav({ view: 'home' })}>
            {dict.masthead}
          </button>
          <div className="rk-masthead__rule">
            <span className="rk-masthead__rule-dot" />
            <span className="rk-masthead__rule-line" />
            <span className="rk-masthead__rule-text">{dict.todayLine.toUpperCase()}</span>
            <span className="rk-masthead__rule-line" />
            <span className="rk-masthead__rule-dot" />
          </div>
        </div>
        <div className="rk-masthead__sidebar rk-masthead__sidebar--right">
          <div className="rk-stamp rk-stamp--right">
            <div className="rk-stamp__line">EST. 2008</div>
            <div className="rk-stamp__line">PRINT · WEB</div>
            <div className="rk-stamp__line rk-stamp__line--em">{edition}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// PrimaryNav ────────────────────────────────────────────────────────────────
function PrimaryNav({ locale, dict, current, onNav, search, onSearch }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="rk-nav">
      <div className="rk-nav__inner">
        <ul className="rk-nav__list">
          {window.RK_DATA.SECTIONS.map(s => (
            <li key={s.slug}>
              <button className={`rk-nav__link ${current === s.slug ? 'is-current' : ''}`}
                      onClick={() => onNav({ view: 'section', section: s.slug })}>
                {locale === 'ur' ? s.label_ur : s.label}
              </button>
            </li>
          ))}
          <li className="rk-nav__more">
            <button className="rk-nav__link" onClick={() => setOpen(o => !o)} aria-expanded={open}>
              {dict.moreNav} ▾
            </button>
            {open && (
              <div className="rk-nav__pop" onMouseLeave={() => setOpen(false)}>
                {window.RK_DATA.MORE_SECTIONS.map(m => (
                  <button key={m} className="rk-nav__pop-item">{m}</button>
                ))}
              </div>
            )}
          </li>
        </ul>
        <div className="rk-nav__search">
          <input type="search" placeholder={dict.search} value={search}
                 onChange={e => onSearch(e.target.value)} />
          <span className="rk-nav__search-icon">⌕</span>
        </div>
      </div>
    </nav>
  );
}

// BreakingTicker ────────────────────────────────────────────────────────────
function BreakingTicker({ items, locale, onNav }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setI(x => (x + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);
  if (!items.length) return null;
  const a = items[i];
  return (
    <div className="rk-breaking" role="region" aria-label="Breaking news">
      <div className="rk-breaking__inner">
        <span className="rk-breaking__tag">
          <span className="rk-breaking__pulse" />
          {locale === 'ur' ? 'اہم خبر' : 'BREAKING'}
        </span>
        <ul className="rk-breaking__dots">
          {items.map((_, n) => <li key={n} className={n === i ? 'is-on' : ''} />)}
        </ul>
        <button className="rk-breaking__title" key={a.id}
                onClick={() => onNav({ view: 'article', slug: a.slug })}>
          {pickTitle(a, locale)}
        </button>
        <span className="rk-breaking__time">{relTime(a.published_at, locale)}</span>
      </div>
    </div>
  );
}

// ArticleImage + cards ──────────────────────────────────────────────────────
function ArticleImage({ a, theme, className }) {
  const src = theme === 'dark' ? a.image_dark : a.image;
  return <div className={`rk-img ${className || ''}`}><img src={src} alt={a.title} loading="lazy" /></div>;
}

function CardLead({ a, locale, theme, onNav }) {
  return (
    <article className="rk-lead">
      <button className="rk-lead__media" onClick={() => onNav({ view: 'article', slug: a.slug })}>
        <ArticleImage a={a} theme={theme} className="rk-img--16x10" />
      </button>
      <div className="rk-lead__body">
        <div className="rk-eyebrow rk-eyebrow--accent">
          <span>{sectionLabel(a.section, locale).toUpperCase()}</span>
          <span className="rk-eyebrow__dot">●</span>
          <span>{relTime(a.published_at, locale)}</span>
        </div>
        <h2 className={`rk-lead__title ${locale === 'ur' ? 'is-urdu' : ''}`}
            onClick={() => onNav({ view: 'article', slug: a.slug })}>
          {pickTitle(a, locale)}
        </h2>
        {a.dek && <p className="rk-lead__dek">{a.dek}</p>}
        <p className="rk-byline">
          <span className="rk-byline__by">By</span>{' '}
          <span className="rk-byline__name">{a.author}</span>
          <span className="rk-byline__sep">·</span>
          <span>{a.reading_time} min read</span>
        </p>
      </div>
    </article>
  );
}

function CardSecondary({ a, locale, onNav }) {
  return (
    <article className="rk-secondary">
      <div className="rk-eyebrow">{sectionLabel(a.section, locale).toUpperCase()}</div>
      <h3 className={`rk-secondary__title ${locale === 'ur' ? 'is-urdu' : ''}`}
          onClick={() => onNav({ view: 'article', slug: a.slug })}>
        {pickTitle(a, locale)}
      </h3>
      <p className="rk-byline">
        <span className="rk-byline__name">{a.author}</span>
        <span className="rk-byline__sep">·</span>
        <span>{relTime(a.published_at, locale)}</span>
      </p>
    </article>
  );
}

function CardTile({ a, locale, theme, onNav }) {
  return (
    <article className="rk-tile">
      <button onClick={() => onNav({ view: 'article', slug: a.slug })} className="rk-tile__media">
        <ArticleImage a={a} theme={theme} className="rk-img--4x3" />
      </button>
      <div className="rk-eyebrow">{sectionLabel(a.section, locale).toUpperCase()}</div>
      <h4 className={`rk-tile__title ${locale === 'ur' ? 'is-urdu' : ''}`}
          onClick={() => onNav({ view: 'article', slug: a.slug })}>
        {pickTitle(a, locale)}
      </h4>
      <p className="rk-byline">
        <span className="rk-byline__name">{a.author}</span>
        <span className="rk-byline__sep">·</span>
        <span>{relTime(a.published_at, locale)}</span>
      </p>
    </article>
  );
}

function CardThumb({ a, locale, theme, onNav, idx }) {
  return (
    <article className="rk-thumb">
      <span className="rk-thumb__num">{String(idx + 1).padStart(2, '0')}</span>
      <button onClick={() => onNav({ view: 'article', slug: a.slug })} className="rk-thumb__media">
        <ArticleImage a={a} theme={theme} className="rk-img--1x1" />
      </button>
      <div className="rk-thumb__body">
        <div className="rk-eyebrow">{sectionLabel(a.section, locale).toUpperCase()}</div>
        <h4 className={`rk-thumb__title ${locale === 'ur' ? 'is-urdu' : ''}`}
            onClick={() => onNav({ view: 'article', slug: a.slug })}>
          {pickTitle(a, locale)}
        </h4>
        <p className="rk-byline">
          <span className="rk-byline__name">{a.author}</span>
          <span className="rk-byline__sep">·</span>
          <span>{relTime(a.published_at, locale)}</span>
        </p>
      </div>
    </article>
  );
}

// Hero (3 variants) ─────────────────────────────────────────────────────────
function Hero({ lead, secondaries, locale, theme, onNav, variant }) {
  if (variant === 'wire') {
    const all = [lead, ...secondaries];
    return (
      <section className="rk-hero rk-hero--wire">
        <div className="rk-section-rule"><span>FRONT PAGE</span></div>
        <div className="rk-hero__wire">
          {all.map(a => (
            <div key={a.id} className="rk-hero__wire-item">
              <CardSecondary a={a} locale={locale} onNav={onNav} />
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (variant === 'magazine') {
    return (
      <section className="rk-hero rk-hero--mag">
        <div className="rk-hero__mag">
          <button className="rk-hero__mag-media" onClick={() => onNav({ view: 'article', slug: lead.slug })}>
            <ArticleImage a={lead} theme={theme} className="rk-img--3x4" />
          </button>
          <div className="rk-hero__mag-body">
            <div className="rk-eyebrow rk-eyebrow--accent">
              <span>{sectionLabel(lead.section, locale).toUpperCase()}</span>
              <span className="rk-eyebrow__dot">●</span>
              <span>{relTime(lead.published_at, locale)}</span>
            </div>
            <h2 className={`rk-hero__mag-title ${locale === 'ur' ? 'is-urdu' : ''}`}
                onClick={() => onNav({ view: 'article', slug: lead.slug })}>
              {pickTitle(lead, locale)}
            </h2>
            {lead.dek && <p className="rk-hero__mag-dek">{lead.dek}</p>}
            <p className="rk-byline">
              <span className="rk-byline__by">By</span>{' '}
              <span className="rk-byline__name">{lead.author}</span>
              <span className="rk-byline__sep">·</span>
              <span>{lead.reading_time} min read</span>
            </p>
            <div className="rk-hero__mag-stack">
              {secondaries.map(s => <CardSecondary key={s.id} a={s} locale={locale} onNav={onNav} />)}
            </div>
          </div>
        </div>
      </section>
    );
  }
  // editorial (default)
  return (
    <section className="rk-hero rk-hero--editorial">
      <div className="rk-hero__grid">
        <CardLead a={lead} locale={locale} theme={theme} onNav={onNav} />
        <aside className="rk-hero__rail">
          <div className="rk-rail-head">
            <span className="rk-rail-head__line" />
            <span className="rk-rail-head__text">ALSO ON THE FRONT</span>
            <span className="rk-rail-head__line" />
          </div>
          {secondaries.map(s => <CardSecondary key={s.id} a={s} locale={locale} onNav={onNav} />)}
        </aside>
      </div>
    </section>
  );
}

// OpinionStrip ──────────────────────────────────────────────────────────────
function OpinionStrip({ items, locale, theme, onNav, dict }) {
  if (!items.length) return null;
  return (
    <section className="rk-opinion">
      <div className="rk-opinion__inner">
        <header className="rk-opinion__head">
          <div>
            <p className="rk-opinion__kicker">— OPINION & COLUMNISTS</p>
            <h2 className="rk-opinion__title">{dict.opinionHeading}</h2>
          </div>
          <p className="rk-opinion__sub">
            Voices from the Valley, the plains, and the diaspora — three columns this week.
          </p>
        </header>
        <div className="rk-opinion__grid">
          {items.map((a, i) => (
            <article key={a.id} className="rk-col">
              <span className="rk-col__num">№ {String(i + 1).padStart(2, '0')}</span>
              <p className="rk-col__column">{a.column}</p>
              <h3 className={`rk-col__title ${locale === 'ur' ? 'is-urdu' : ''}`}
                  onClick={() => onNav({ view: 'article', slug: a.slug })}>
                “{pickTitle(a, locale)}”
              </h3>
              <p className="rk-col__dek">{a.dek}</p>
              <div className="rk-col__author">
                <div className="rk-col__avatar">
                  {a.author.split(' ').map(p => p[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="rk-col__name">{a.author}</p>
                  <p className="rk-col__meta">{relTime(a.published_at, locale)} · {a.reading_time} min</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// SectionStrip ──────────────────────────────────────────────────────────────
function SectionStrip({ title, articles, locale, theme, onNav, layout = 'four-up', sectionSlug }) {
  if (!articles.length) return null;
  return (
    <section className="rk-strip">
      <div className="rk-strip__inner">
        <header className="rk-strip__head">
          <h2 className={`rk-strip__title ${locale === 'ur' ? 'is-urdu' : ''}`}>
            <span className="rk-strip__num">→</span> {title}
          </h2>
          <button className="rk-strip__more"
                  onClick={() => onNav({ view: 'section', section: sectionSlug })}>
            {locale === 'ur' ? '← مزید پڑھیں' : 'More in section →'}
          </button>
        </header>
        {layout === 'four-up' ? (
          <div className="rk-strip__grid">
            {articles.map(a => <CardTile key={a.id} a={a} locale={locale} theme={theme} onNav={onNav} />)}
          </div>
        ) : (
          <ul className="rk-strip__list">
            {articles.map((a, i) => (
              <li key={a.id}><CardThumb a={a} locale={locale} theme={theme} onNav={onNav} idx={i} /></li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

// NewsletterBand ────────────────────────────────────────────────────────────
function NewsletterBand({ locale }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <section className="rk-news">
      <div className="rk-news__inner">
        <div className="rk-news__copy">
          <p className="rk-news__kicker">★ MORNING DISPATCH</p>
          <h3 className="rk-news__title">Six stories from the Valley, in your inbox by 7 a.m.</h3>
          <p className="rk-news__dek">Hand-picked by the RK desk. Free, ad-free, unsubscribe anytime.</p>
        </div>
        <form className="rk-news__form"
              onSubmit={e => { e.preventDefault(); if (email) setDone(true); }}>
          {done ? (
            <p className="rk-news__done">✓ You're on the list — see you in the morning.</p>
          ) : (
            <>
              <input type="email" required placeholder="you@yourstreet.in"
                     value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit">Subscribe</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

// Footer ────────────────────────────────────────────────────────────────────
function Footer({ locale, dict, onNav }) {
  return (
    <footer className="rk-footer">
      <div className="rk-footer__inner">
        <div className="rk-footer__brand">
          <p className="rk-footer__title">Rising Kashmir</p>
          <p className="rk-footer__addr">Press Enclave, Polo View<br/>Srinagar, J&K · 190001</p>
          <p className="rk-footer__addr rk-footer__addr--alt">news@risingkashmir.example<br/>+91-194-XXXX-XXX</p>
        </div>
        <div className="rk-footer__cols">
          <div>
            <p className="rk-footer__h">Sections</p>
            <ul>
              {window.RK_DATA.SECTIONS.map(s => (
                <li key={s.slug}>
                  <button onClick={() => onNav({ view: 'section', section: s.slug })}>{s.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="rk-footer__h">More</p>
            <ul>{window.RK_DATA.MORE_SECTIONS.map(m => <li key={m}><button>{m}</button></li>)}</ul>
          </div>
          <div>
            <p className="rk-footer__h">About</p>
            <ul>
              <li><button>Editorial team</button></li><li><button>Contact</button></li>
              <li><button>Careers</button></li><li><button>Code of conduct</button></li>
              <li><button>Privacy</button></li><li><button>Terms</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="rk-footer__bottom">
        <p>© {new Date().getFullYear()} Rising Kashmir. All rights reserved.</p>
        <p>An independent voice from the Valley since 2008.</p>
      </div>
    </footer>
  );
}

// ArticleReader ─────────────────────────────────────────────────────────────
function ArticleReader({ slug, locale, theme, dict, onNav }) {
  const a = window.RK_DATA.ARTICLES.find(x => x.slug === slug);
  if (!a) return <div className="rk-empty">Article not found.</div>;
  const related = window.RK_DATA.ARTICLES
    .filter(x => x.section === a.section && x.id !== a.id).slice(0, 4);
  const body = a.body || [
    'Placeholder body 1.', 'Placeholder body 2.', 'Placeholder body 3.',
  ];
  return (
    <article className="rk-article">
      <button className="rk-article__back" onClick={() => onNav({ view: 'home' })}>
        {dict.backToFront}
      </button>
      <div className="rk-article__head">
        <div className="rk-eyebrow rk-eyebrow--accent">
          <span>{sectionLabel(a.section, locale).toUpperCase()}</span>
          <span className="rk-eyebrow__dot">●</span>
          <span>{new Date(a.published_at).toLocaleDateString(
            locale === 'ur' ? 'ur-IN' : 'en-IN',
            { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h1 className={`rk-article__title ${locale === 'ur' ? 'is-urdu' : ''}`}>
          {pickTitle(a, locale)}
        </h1>
        {a.dek && <p className="rk-article__dek">{a.dek}</p>}
        <div className="rk-article__byline">
          <div className="rk-col__avatar">
            {a.author.split(' ').map(p => p[0]).slice(0, 2).join('')}
          </div>
          <div>
            <p className="rk-article__author">By {a.author}</p>
            <p className="rk-article__meta">{relTime(a.published_at, locale)} · {a.reading_time} min read</p>
          </div>
          <div className="rk-article__tools">
            <button title="Save">☆</button>
            <button title="Share">⤴</button>
            <button title="Listen">▷ Listen</button>
            <button title="Print">⎙</button>
          </div>
        </div>
      </div>
      <ArticleImage a={a} theme={theme} className="rk-img--16x9 rk-article__hero" />
      <div className="rk-article__body">
        <div className="rk-article__rail">
          <p className="rk-article__rail-h">In this story</p>
          <ul>
            <li>The march at Lal Chowk</li><li>Doctors join in</li><li>What changes next</li>
          </ul>
          <p className="rk-article__rail-h rk-article__rail-h--mt">{dict.relatedHeading}</p>
          <ul className="rk-article__related">
            {related.slice(0, 3).map(r => (
              <li key={r.id}>
                <button onClick={() => onNav({ view: 'article', slug: r.slug })}>
                  {pickTitle(r, locale)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rk-article__text">
          {body.map((p, i) => <p key={i} className={i === 0 ? 'rk-article__lead' : ''}>{p}</p>)}
          <blockquote className="rk-article__quote">
            "The Valley does not ask for sympathy. It asks for the dignity of an honest paragraph,
            written carefully, and printed on time."
            <cite>— Editorial board, on the redesign</cite>
          </blockquote>
          {body.map((p, i) => <p key={'b' + i}>{p}</p>)}
        </div>
      </div>
      <div className="rk-article__more">
        <h3 className="rk-strip__title">More in {sectionLabel(a.section, locale)}</h3>
        <div className="rk-strip__grid">
          {related.slice(0, 4).map(r => (
            <CardTile key={r.id} a={r} locale={locale} theme={theme} onNav={onNav} />
          ))}
        </div>
      </div>
    </article>
  );
}

// SectionPage ───────────────────────────────────────────────────────────────
function SectionPage({ section, locale, theme, onNav }) {
  const arts = window.RK_DATA.ARTICLES.filter(a => a.section === section);
  const sLabel = sectionLabel(section, locale);
  const [hero, ...rest] = arts;
  if (!hero) return <div className="rk-empty">No articles in this section yet.</div>;
  return (
    <div className="rk-sectionpage">
      <header className="rk-sectionpage__head">
        <p className="rk-sectionpage__kicker">— SECTION</p>
        <h1 className="rk-sectionpage__title">{sLabel}</h1>
        <p className="rk-sectionpage__count">
          {arts.length} stories · updated {relTime(arts[0].published_at, locale)}
        </p>
      </header>
      <CardLead a={hero} locale={locale} theme={theme} onNav={onNav} />
      <div className="rk-sectionpage__grid">
        {rest.map(a => <CardTile key={a.id} a={a} locale={locale} theme={theme} onNav={onNav} />)}
      </div>
    </div>
  );
}

// EpaperPage ────────────────────────────────────────────────────────────────
function EpaperPage({ onNav }) {
  return (
    <div className="rk-epaper">
      <header className="rk-sectionpage__head">
        <p className="rk-sectionpage__kicker">— DIGITAL EDITION</p>
        <h1 className="rk-sectionpage__title">E-Paper</h1>
        <p className="rk-sectionpage__count">Today's print edition, page-for-page.</p>
      </header>
      <div className="rk-epaper__shelf">
        {[1,2,3,4,5,6].map(n => (
          <button key={n} className="rk-epaper__page" onClick={() => onNav({ view: 'home' })}>
            <div className="rk-epaper__sheet">
              <div className="rk-epaper__masthead">RISING KASHMIR</div>
              <div className="rk-epaper__lines">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} style={{ width: `${60 + Math.random() * 40}%` }} />
                ))}
              </div>
            </div>
            <p className="rk-epaper__label">Page {String(n).padStart(2, '0')}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// SearchResults ─────────────────────────────────────────────────────────────
function SearchResults({ query, locale, theme, onNav }) {
  const q = query.trim().toLowerCase();
  const results = window.RK_DATA.ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    (a.dek || '').toLowerCase().includes(q) ||
    a.author.toLowerCase().includes(q) ||
    a.section.includes(q)
  );
  return (
    <div className="rk-search">
      <header className="rk-sectionpage__head">
        <p className="rk-sectionpage__kicker">— SEARCH</p>
        <h1 className="rk-sectionpage__title">"{query}"</h1>
        <p className="rk-sectionpage__count">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
      </header>
      <ul className="rk-strip__list">
        {results.map((a, i) => (
          <li key={a.id}><CardThumb a={a} locale={locale} theme={theme} onNav={onNav} idx={i} /></li>
        ))}
      </ul>
    </div>
  );
}
```

### Dictionary strings (extend `src/i18n/dictionary.ts`)

```ts
export const DICT = {
  en: {
    eyebrow: 'Independent journalism from the Valley',
    masthead: 'Rising Kashmir',
    breaking: 'Breaking',
    moreNav: 'More',
    sectionMore: 'More in section →',
    opinionHeading: 'Opinion & Columnists',
    leadEyebrow: 'Today\u2019s lead',
    todayLine: 'Late edition',
    weather: 'Srinagar  ·  18° clear',
    subscribe: 'Subscribe',
    search: 'Search the Valley\u2026',
    relatedHeading: 'Related reporting',
    backToFront: '← Back to front page',
  },
  ur: {
    eyebrow: 'وادی سے آزاد صحافت',
    masthead: 'رائزنگ کشمیر',
    breaking: 'اہم خبر',
    moreNav: 'مزید',
    sectionMore: '← مزید پڑھیں',
    opinionHeading: 'رائے و کالم نگار',
    leadEyebrow: 'آج کی سرخی',
    todayLine: 'تاخیری اشاعت',
    weather: 'سری نگر  ·  ۱۸°  صاف',
    subscribe: 'سبسکرائب کریں',
    search: 'تلاش کریں…',
    relatedHeading: 'متعلقہ خبریں',
    backToFront: '← صفحۂ اول پر واپس',
  },
};
```

### Sections list

```ts
export const SECTIONS = [
  { slug: 'kashmir',  label: 'Kashmir',  label_ur: 'کشمیر' },
  { slug: 'jammu',    label: 'Jammu',    label_ur: 'جموں' },
  { slug: 'india',    label: 'India',    label_ur: 'بھارت' },
  { slug: 'world',    label: 'World',    label_ur: 'دنیا' },
  { slug: 'opinion',  label: 'Opinion',  label_ur: 'رائے' },
  { slug: 'sports',   label: 'Sports',   label_ur: 'کھیل' },
  { slug: 'business', label: 'Business', label_ur: 'کاروبار' },
];
export const MORE_SECTIONS = ['Sci / Tech', 'Travel', 'Entertainment', 'Editorial', 'Video', 'E-Paper', 'Archive'];
```

## ACCEPTANCE CRITERIA

1. Home renders **utility bar → masthead → primary nav → optional breaking ticker → hero → opinion strip → kashmir 4-up strip → sports/world dual strip → newsletter band → footer**, all with the exact tokens, fonts, and spacing in the CSS above.
2. Three hero variants are switchable (toolbar, settings panel, or query param — your call).
3. `data-theme` toggles light / dark / sepia at runtime; `data-density` and `data-serif` swap globally; `--accent` is overridable from JS.
4. Locale toggle flips `lang` + `dir` and renders Urdu strings; `.is-urdu` class swaps to Noto Naskh Arabic for headlines.
5. Article reader has a 220px sticky rail, a centered 660px serif column, accent drop cap on the lead paragraph, and an accent-bordered pull quote.
6. Search input filters articles by title/dek/author/section live and renders results using `CardThumb`.
7. No rounded corners anywhere except the breaking-pulse dot and avatars (50%).
8. The 'RK' watermark on the newsletter band sits at `right: -40px; bottom: -80px`, opacity 0.04, font-size 320px.

Stay strict to the reference. Ship.
