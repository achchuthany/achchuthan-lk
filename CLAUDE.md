# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project Overview

Multi-page personal portfolio for an academic instructor and software
engineer (Yogarajah Achchuthan). All page content is driven by structured
JSON data files in `src/data/`; the React components render that data. There
is no backend, database, or API — it is a client-side-routed static site
built with Vite.

**Tech stack:** React 19 · React Router 7 · Vite 8 · Framer Motion 12 ·
Lucide React (icons) · plain CSS (one `.css` file per component/section) ·
ESLint 9 (flat config). JavaScript only — no TypeScript, no CSS framework.

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

Entry point `src/main.jsx` wraps `src/App.jsx` in `<BrowserRouter>` (React
StrictMode). `App.jsx` declares the route table: a single `<Layout>` route
with child routes, one per page. `Layout.jsx` renders the shared shell —
sticky `Navbar`, `ScrollProgress`, `ScrollToTop`, a route-keyed animated
`<main>` (`<Outlet />`), and `Footer`.

**Routes** (defined in `App.jsx`, one page component each in `src/pages/`):

| Path | Page | Section(s) rendered |
| --- | --- | --- |
| `/` | `HomePage` | `Hero` + `About` |
| `/academic` | `AcademicPage` | `Academic` |
| `/projects` | `ProjectsPage` | `Projects` |
| `/skills` | `SkillsPage` | `Stack` |
| `/timeline` | `TimelinePage` | `Timeline` |
| `/activities` | `ActivitiesPage` | `Activities` |
| `/contact` | `ContactPage` | `Contact` |
| `*` | `NotFoundPage` | 404 fallback |

Pages are thin wrappers: each renders `<SEOHead {...PAGE_META.x} />` plus its
section component(s). The `sections/` components hold the actual markup and
still carry an `id` (kept for in-page anchors and stable hooks), but
navigation is now route-based, not scroll-based.

**Directory layout:**

- `src/pages/` — one route component per page (thin wrappers over sections),
  plus `pageMeta.js` (per-route SEO title/description/canonical) and
  `NotFoundPage` (+ its CSS).
- `src/sections/` — the content blocks, one component + one CSS file each:
  `Hero`, `About`, `Academic`, `Projects`, `Stack`, `Timeline`,
  `Activities`, `Contact`. `Section.css` holds shared section styling.
- `src/components/` — reusable UI + shell: `Layout`, `Navbar`, `Footer`,
  `ScrollToTop`, `ScrollProgress`, `Card`, `Badge`, `FilterTabs`,
  `SectionHeading`, `SEOHead`. Each has a co-located `.css` file (except
  `SEOHead`/`ScrollToTop`, which render no markup).
- `src/data/` — JSON content: `profile`, `courses`, `publications`,
  `adminRoles`, `education`, `projects`, `stack`, `timeline`, `activities`.
- `src/hooks/` — `useTheme` (light/dark).
- `src/utils/` — `date.js` (`formatDisplayDate`, `formatDateRange`).
- `public/` — static assets served as-is: `favicon.svg`, `icons.svg`,
  `robots.txt`, `sitemap.xml`, and `_redirects` (SPA fallback).

**Key mechanisms:**

- **Navigation:** `Navbar.jsx` holds a `NAV_ITEMS` array mapping labels to
  route paths, rendered as React Router `NavLink`s that get
  `navbar__link--active` on the current route (`end` on `/`). Adding a page
  means: create the section + a page wrapper in `src/pages/`, register the
  `<Route>` in `App.jsx`, add an entry to `NAV_ITEMS`, add `PAGE_META`, and
  add the URL to `public/sitemap.xml`.
- **Scroll reset:** `ScrollToTop` (in `Layout`) jumps to the top on every
  route change so pages open at their heading.
- **SPA fallback:** client-side routes need the host to serve `index.html`
  for unknown paths. `public/_redirects` covers Netlify/Cloudflare Pages;
  other hosts need an equivalent rewrite (Vercel `rewrites`, Nginx
  `try_files`). `vite preview` handles this automatically in local testing.
- **Theme:** `useTheme` sets `data-theme` on `<html>` and persists the
  choice in `localStorage` (`preferred-theme`), defaulting to the system
  preference. All colors are CSS custom properties defined in
  `src/index.css` for light (`:root`), system dark
  (`@media prefers-color-scheme: dark`), and manual overrides
  (`:root[data-theme="light"|"dark"]`). Never hardcode colors — use the
  `--color-*` tokens (with `--text`, `--bg`, `--accent` compatibility
  aliases).
- **SEO:** `SEOHead.jsx` imperatively upserts `<title>`, meta description,
  Open Graph tags, and the canonical link whenever its props change. Each
  page passes its entry from `src/pages/pageMeta.js`, so the title and
  canonical URL track the current route. Static defaults for first paint
  live in `index.html`.
- **Filters:** several pages filter their data client-side with the shared
  `FilterTabs` component and local `useState` — Academic (course level +
  publication type), Projects (Web/Mobile), Skills (category), Timeline
  (track), Activities (category). Filter option lists are derived from the
  data where practical (e.g. Academic course levels) so new values appear
  automatically. Render an empty-state message when a filter yields nothing.
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
  Lucide lacks (e.g. the GitHub/LinkedIn icons in `About.jsx`/`Contact.jsx`).
- **Routing:** use React Router `Link`/`NavLink` for internal navigation
  (never raw `<a href>` to a route). External links use `target="_blank"`
  with `rel="noreferrer"`.
- **Mobile-first & dark mode:** layouts are responsive with a `640px`
  breakpoint (`@media (max-width: 639px)`) and mobile card fallbacks for wide
  tables. Style for both themes via the `--color-*` tokens — never hardcode
  hex colors in component CSS, or dark mode breaks.
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
