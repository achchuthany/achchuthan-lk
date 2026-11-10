# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project Overview

Multi-page personal portfolio for an academic instructor and software
engineer (Yogarajah Achchuthan). All page content is driven by structured
JSON data files in `src/data/`; the React components render that data. There
is no backend, database, or API — it is a static site built with Vite. Every
route is pre-rendered to HTML at build time and then hydrated into a
client-side-routed React app.

**Tech stack:** React 19 · React Router 7 · Vite 8 · Framer Motion 12 ·
Lucide React (icons) · plain CSS (one `.css` file per component/section) ·
ESLint 9 (flat config). JavaScript only — no TypeScript, no CSS framework.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server (local development)
npm run build     # client build + SSR build + pre-render every route to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint over the repo
```

There is no test suite. Verify changes with `npm run lint`, `npm run build`
(it fails if any route throws while pre-rendering), and by running
`npm run dev`. CI (`.github/workflows/ci.yml`) runs lint + build on every push
to `master` and every PR.

## Architecture

Entry point `src/main.jsx` wraps `src/App.jsx` in `<BrowserRouter>` (React
StrictMode) and calls `hydrateRoot` when `#root` already holds pre-rendered
markup (production) or `createRoot` when it's empty (dev server).
`src/entry-server.jsx` is the build-time counterpart: it renders `App` inside
a `StaticRouter`. `App.jsx` declares the route table: a single `<Layout>`
route with child routes, one per page. `Layout.jsx` renders the shared shell
inside `<MotionConfig reducedMotion="user">` — skip link, sticky `Navbar`,
`ScrollProgress`, `ScrollToTop`, a route-keyed animated `<main
id="main-content">` (`<Outlet />`), and `Footer`.

**Routes** (defined in `App.jsx`, one page component each in `src/pages/`):

| Path | Page | Section(s) rendered |
| --- | --- | --- |
| `/` | `HomePage` | `Hero` + `About` |
| `/academic` | `AcademicPage` | `Academic` |
| `/projects` | `ProjectsPage` | `Projects` |
| `/projects/:slug` | `ProjectDetailPage` | `ProjectDetail` (unknown slug → `NotFoundPage`) |
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
  plus `pageMeta.js` (per-route SEO title/description/canonical,
  `projectMeta(project)`, `NOT_FOUND_META`) and `NotFoundPage` (+ its CSS).
- `src/sections/` — the content blocks, one component + one CSS file each:
  `Hero`, `About`, `Academic`, `Projects`, `ProjectDetail`, `Stack`,
  `Timeline`, `Activities`, `Contact`. `Section.css` holds shared section styling.
- `src/components/` — reusable UI + shell: `Layout`, `Navbar`, `Footer`,
  `ScrollToTop`, `ScrollProgress`, `Avatar`, `Card`, `Badge`, `FilterTabs`,
  `SectionHeading`, `SEOHead`. Each has a co-located `.css` file (except
  `SEOHead`/`ScrollToTop`, which render no markup).
- `src/data/` — JSON content: `profile`, `courses`, `publications`,
  `adminRoles`, `education`, `projects`, `stack`, `timeline`, `activities`.
- `src/hooks/` — `useTheme` (light/dark).
- `src/utils/` — `date.js` (`formatDisplayDate`, `formatDateRange`) and
  `seo.js` (site URL, OG image, Person JSON-LD, and the head-tag list shared
  by `SEOHead` and the pre-renderer).
- `src/entry-server.jsx` — build-time SSR entry: `render(url)`, the `ROUTES`
  list (drives pre-rendering *and* the sitemap), and `NOT_FOUND`.
- `scripts/prerender.js` — post-build step that writes each route's HTML,
  `404.html`, and `sitemap.xml` into `dist/`.
- `src/App.css` — app-shell layout (`.app-shell`, `.app-main` container).
- `public/` — static assets served as-is: `favicon.svg`, `icons.svg`,
  `og-image.png` (1200×630 link-preview image), `robots.txt`, and
  `_redirects` (Netlify/Cloudflare redirects).
- `vercel.json` — Vercel `cleanUrls` + the same redirects as `_redirects`.

**Key mechanisms:**

- **Navigation:** `Navbar.jsx` holds a `NAV_ITEMS` array mapping labels to
  route paths, rendered as React Router `NavLink`s that get
  `navbar__link--active` on the current route (`end` on `/`). Adding a page
  means: create the section + a page wrapper in `src/pages/`, register the
  `<Route>` in `App.jsx`, add an entry to `NAV_ITEMS`, add `PAGE_META`, and
  add the route to `ROUTES` in `src/entry-server.jsx` (that generates its
  HTML file and sitemap entry). Project detail pages are added automatically
  from `projects.json`.
- **Accessibility:** a "Skip to content" link (`Layout.css`) targets
  `#main-content`; after each client-side navigation `Layout` moves focus to
  `<main>` (`tabIndex={-1}`, `preventScroll`). `MotionConfig
  reducedMotion="user"` disables transform animations for visitors with
  reduced-motion enabled — new motion code inherits this automatically.
- **Scroll reset:** `ScrollToTop` (in `Layout`) jumps to the top on every
  route change so pages open at their heading.
- **Pre-rendering & hosting:** `npm run build` runs the client build, an SSR
  build of `src/entry-server.jsx` into `dist-ssr/`, then
  `scripts/prerender.js`, which fills the `<!--app-head-->` and
  `<!--app-html-->` placeholders in `index.html` for every route. Output uses
  clean-URL files: `/` → `index.html`, `/projects` → `projects.html`,
  `/projects/macosys` → `projects/macosys.html`, plus `404.html`. Netlify,
  Cloudflare Pages and GitHub Pages serve these natively; Vercel needs
  `cleanUrls` (set in `vercel.json`); Nginx needs
  `try_files $uri $uri.html /404.html`. Do **not** add a catch-all rewrite
  to `/index.html` — it would serve the home page's HTML for other routes.
  `vite preview` resolves routes correctly but falls back to `index.html` for
  unknown paths, so a 404 there briefly logs a hydration mismatch (fine
  locally only).
- **SSR safety:** components render on Node at build time, so never touch
  `window`, `document`, or `localStorage` during render — only inside
  `useEffect`/event handlers. Anything that differs between build time and
  the visitor's browser must use a server snapshot (see `useTheme`) or
  `suppressHydrationWarning` (the footer year).
- **Legacy URLs:** the old blog posts `/2021/06/macosis.html` and
  `/2022/08/myuoj.html`, plus `/projects/macosis` (MaCoSys's former slug),
  301-redirect to their project pages via `public/_redirects` and
  `vercel.json`; keep the two files in sync. If you rename a project's
  `slug`, add a redirect from the old path.
- **Mobile menu (iOS Safari):** `Navbar.jsx` guards menu state changes with
  a `TAP_GUARD_MS` (400 ms) window because iOS fires a duplicate `click` when
  the toggle swaps its icon mid-tap. In `Navbar.css`, the mobile breakpoint
  deliberately disables `backdrop-filter` on `.navbar`, and `.navbar` must not
  use `overflow-x: clip`. Either one makes the absolutely-positioned dropdown
  invisible on iOS while it stays tappable. Keep these when restyling the
  navbar, and test on iOS Safari (or WebKit) after any change there.
- **Theme:** an inline script in `index.html` sets `data-theme` on `<html>`
  before first paint (from `localStorage` `preferred-theme`, else the system
  preference), so dark mode never flashes light. `useTheme` reads that
  attribute via `useSyncExternalStore` (server snapshot `"light"`), and
  `toggleTheme` writes the attribute + `localStorage`. Keep the storage key in
  sync between the script and the hook. All colors are CSS custom properties defined in
  `src/index.css` for light (`:root`), system dark
  (`@media prefers-color-scheme: dark`), and manual overrides
  (`:root[data-theme="light"|"dark"]`). Never hardcode colors — use the
  `--color-*` tokens (with `--text`, `--bg`, `--accent` compatibility
  aliases).
- **Design system (`src/index.css`):** the accent is a developer-style blue
  — `#2563eb` (blue-600) in light mode, `#60a5fa` (blue-400) in dark — over
  cool slate neutrals (`--color-accent` / `--color-accent-solid` /
  `--gradient-accent`). The same blue is baked into `public/favicon.svg` and
  `public/og-image.png`; update those too if the accent changes. Type
  uses two families — `--font-display` (Space Grotesk, applied to `h1`–`h4`)
  and `--font-sans` (Inter, body); both are loaded from Google Fonts in
  `index.html`. Shape and rhythm come from token scales: `--radius-sm/…/-pill`,
  `--space-1`…`--space-8`, `--section-y` (clamped section padding), and
  `--shadow-sm/-/-lg/-accent`. Use these tokens rather than magic numbers.
  A reusable button system lives here too: `.btn` + `.btn--primary`
  (gradient, pill), `.btn--ghost`, `.btn--block` — reuse it for any button or
  link-as-button instead of bespoke per-section button CSS.
- **Icons:** `lucide-react` is the icon set. Note the pinned `1.8.0` does
  **not** export brand icons (Github/Linkedin) — keep the inline brand SVGs
  in `About.jsx`/`Contact.jsx` for those. `SectionHeading` takes an `icon`
  prop (a Lucide component) that renders the eyebrow chip; every section
  passes one. The brand mark is `public/favicon.svg` (the "A" logo), reused
  via `<img src="/favicon.svg">` in the navbar and footer.
- **SEO:** `getHeadTags()` in `src/utils/seo.js` is the single definition of
  a page's head: title, description, robots (`noindex` for the 404), Open
  Graph (`og:url`, `og:image`), Twitter card, canonical, and a schema.org
  `Person` JSON-LD built from `profile.json`. The pre-renderer writes these
  into each HTML file; `SEOHead.jsx` re-applies them on client-side
  navigation. Each page passes its entry from `src/pages/pageMeta.js`.
  `index.html` holds no per-page tags — don't add any there.
- **Contact & avatar:** the Contact page has no form: an identity row
  (`Avatar` + "`role` from `location`"), an "Email me" `mailto:` button,
  social links, and a details card — all from `profile.json` (`role`,
  `location`, `email`, `tagline`, `availableForConsulting`, `openTo`).
  `Avatar` (`src/components/Avatar.jsx`, also used in `Hero`) shows
  `profile.avatar` (a path under `public/`, e.g. `/avatar.jpg`) in a gradient
  ring, falling back to an initials monogram when it's empty.
- **Filters:** several pages filter their data client-side with the shared
  `FilterTabs` component and local `useState` — Academic (course level +
  publication type), Projects (by `category`; tabs are derived from the data
  and hidden when there's only one category), Skills (category), Timeline
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
  Page-level wrappers (the outer `motion.section` and any container that
  grows with the data) must use `viewport={{ once: true, amount: "some" }}`,
  never a fraction. A fraction like `0.15` of a 5,000px section is taller
  than a phone screen, so the threshold is never met and the whole page
  stays at `opacity: 0` (this hid the Activities page on mobile). Fractional
  `amount`s are fine on individual cards and rows.
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
