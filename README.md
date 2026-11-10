# Personal Academic + Engineering Portfolio

## Project Purpose

This project is a multi-page portfolio for an instructor and software engineer.
It highlights teaching, research, projects, technical stack, timeline, and contact information using structured JSON data files.

Content is split across routes with client-side navigation (React Router):

- `/` — Home (intro + about)
- `/academic` — teaching, courses, roles, education, publications
- `/projects` — projects, with a detail page per project at `/projects/<slug>`
- `/skills` — technical stack
- `/timeline` — experience timeline
- `/activities` — conferences, creative work, institutional development
- `/contact` — contact details (email, location, social profiles)

## How To Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

## How To Update Data

All profile and content data is stored in `src/data/`.

Edit the JSON files in that directory to update:

- Personal profile details (`profile.json`: contact info, `openTo` list, and
  `avatar` — a photo path under `public/`, e.g. `/avatar.jpg`; leave empty
  to show an initials monogram)
- Courses and publications
- Administrative roles and education
- Projects (each project's `slug` becomes its `/projects/<slug>` page;
  optional `highlights` and `repo` fields appear there), stack, and timeline
  entries

## Deployment

`npm run build` pre-renders every route to static HTML in `dist/`
(`index.html`, `projects.html`, `projects/<slug>.html`, …) plus `404.html`
and `sitemap.xml`, so pages load with real content for visitors, search
engines and link previews.

Upload `dist/` to any static host that supports clean URLs (serving
`/projects` from `projects.html`):

- **Netlify / Cloudflare Pages / GitHub Pages:** works as-is. Redirects for
  the old blog URLs live in `public/_redirects`.
- **Vercel:** works as-is via `vercel.json` (`cleanUrls` + redirects).
- **Nginx:** `try_files $uri $uri.html /404.html;`

Do not add a catch-all rewrite to `/index.html`.

## Tech Stack

- React 19 (JavaScript)
- React Router 7
- Vite
- Framer Motion
- Lucide React
- CSS modules-by-component pattern (separate `.css` files)
- ESLint
