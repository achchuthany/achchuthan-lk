# Personal Academic + Engineering Portfolio

## Project Purpose

This project is a multi-page portfolio for an instructor and software engineer.
It highlights teaching, research, projects, technical stack, timeline, and contact information using structured JSON data files.

Content is split across routes with client-side navigation (React Router):

- `/` — Home (intro + about)
- `/academic` — teaching, courses, roles, education, publications
- `/projects` — projects
- `/skills` — technical stack
- `/timeline` — experience timeline
- `/activities` — conferences, creative work, institutional development
- `/contact` — contact details and form

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

- Personal profile details
- Courses and publications
- Administrative roles and education
- Projects, stack, and timeline entries

## Deployment

This is a single-page-application with client-side routing, so the host must
serve `index.html` for unknown paths (otherwise refreshing `/projects` 404s).
`public/_redirects` handles this on Netlify and Cloudflare Pages; other hosts
need an equivalent rewrite rule.

## Tech Stack

- React 19 (JavaScript)
- React Router 7
- Vite
- Framer Motion
- Lucide React
- CSS modules-by-component pattern (separate `.css` files)
- ESLint
