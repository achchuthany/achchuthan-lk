# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project Overview

Single-page personal portfolio for an academic instructor and software
engineer (Yogarajah Achchuthan). All page content is driven by structured
JSON data files in `src/data/`; the React components render that data. There
is no backend, database, or API — it is a static site built with Vite.

**Tech stack:** React 19 · Vite 8 · Framer Motion 12 · Lucide React (icons)
· plain CSS (one `.css` file per component/section) · ESLint 9 (flat config).
JavaScript only — no TypeScript, no CSS framework.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server (local development)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint over the repo
```

There is no test suite. Verify changes with `npm run lint` and by running
`npm run dev`.

## Architecture

Entry point `src/main.jsx` mounts `src/App.jsx` in React StrictMode.
`App.jsx` renders a fixed navbar and a single `<main>` containing every
section stacked vertically. Navigation is anchor-based scrolling between
section `id`s — there are no routes despite `react-router-dom` being a
dependency.

**Directory layout:**

- `src/sections/` — the page sections, one component + one CSS file each:
  `Hero`, `About`, `Academic`, `Projects`, `Stack`, `Timeline`,
  `Activities`, `Contact`. Each root element has a matching `id`
  (`hero`, `about`, `academic`, `projects`, `stack`, `timeline`,
  `activities`, `contact`) used for scroll navigation and scroll-spy.
  `Section.css` holds shared section styling.
- `src/components/` — reusable UI: `Navbar`, `Footer`, `Card`, `Badge`,
  `FilterTabs`, `SectionHeading`, `ScrollProgress`, `SEOHead`. Each has a
  co-located `.css` file (except `SEOHead`, which renders no markup).
- `src/data/` — JSON content: `profile`, `courses`, `publications`,
  `adminRoles`, `education`, `projects`, `stack`, `timeline`, `activities`.
- `src/hooks/` — `useTheme` (light/dark), `useScrollSpy` (active-section
  tracking).
- `src/utils/` — `date.js` (`formatDisplayDate`, `formatDateRange`).
- `public/` — static assets served as-is: `favicon.svg`, `icons.svg`,
  `robots.txt`, `sitemap.xml`.

**Key mechanisms:**

- **Navigation:** `Navbar.jsx` holds a `NAV_ITEMS` array mapping labels to
  section ids. Clicking scrolls smoothly to the section. Adding or renaming a
  section means updating both the section's `id` and `NAV_ITEMS`.
- **Scroll-spy:** `useScrollSpy(sectionIds)` combines an
  `IntersectionObserver` with a scroll listener to return the currently
  active section id; the navbar highlights the matching link.
- **Theme:** `useTheme` sets `data-theme` on `<html>` and persists the
  choice in `localStorage` (`preferred-theme`), defaulting to the system
  preference. All colors are CSS custom properties defined in
  `src/index.css` for light (`:root`), system dark
  (`@media prefers-color-scheme: dark`), and manual overrides
  (`:root[data-theme="light"|"dark"]`). Never hardcode colors — use the
  `--color-*` tokens (with `--text`, `--bg`, `--accent` compatibility
  aliases).
- **SEO:** `SEOHead.jsx` imperatively upserts `<title>`, meta description,
  Open Graph tags, and the canonical link on mount. Static defaults also
  live in `index.html`.
- **Build metadata:** `vite.config.js` injects `VITE_BUILD_NUMBER` (from
  `package.json` version) and `VITE_BUILD_DATE` as `import.meta.env` values.

## Conventions

- **Content lives in JSON, not JSX.** To change page text (courses,
  projects, publications, roles, etc.), edit the relevant file in
  `src/data/` — do not hardcode content into components. Each array item has
  a stable `id` used as the React `key`. Match the existing shape of the file
  when adding entries.
- **Component pattern:** function components with a default export; the
  co-located CSS file is imported at the top. CSS class names follow a
  BEM-ish convention (`block`, `block__element`, `block--modifier`), e.g.
  `academic-course-card`, `navbar__link`, `filter-tabs__button--active`.
- **Animation:** sections and lists use Framer Motion. The common pattern is
  a `motion.section` with `initial`/`whileInView` fade-up, and staggered
  children via `containerVariants` (`staggerChildren`) + `itemVariants`
  (`opacity`/`y`). Reuse these variant shapes for consistency; motion
  elements are aliased at module scope (e.g. `const MotionSection =
  motion.section`).
- **Dates:** store dates in JSON as `YYYY-MM-DD`, a bare `YYYY` year, or the
  string `"present"`. Render them through `formatDisplayDate` /
  `formatDateRange` from `src/utils/date.js` rather than formatting inline.
- **Icons:** import from `lucide-react`. Inline SVGs are used only for marks
  Lucide lacks (e.g. the GitHub icon in `Projects.jsx`).
- **External links:** use `target="_blank"` with `rel="noreferrer"`.
- **Responsive tables:** some sections (e.g. Academic admin roles) render a
  `<table>` for wide screens plus a card list for narrow screens; keep both
  in sync when editing that data.
- **Style:** 2-space indentation, double-quoted strings in JSX/components.
  ESLint's `no-unused-vars` ignores identifiers matching `^[A-Z_]` (so
  capitalized imports kept for JSX/motion aliases don't error). Run
  `npm run lint` before committing.

## Git Workflow

- Do not commit `node_modules/` or `dist/` (both git-ignored).
- Write clear, descriptive commit messages; the history uses Conventional
  Commit prefixes (`feat:`, etc.).
- Do not open a pull request unless explicitly asked.
