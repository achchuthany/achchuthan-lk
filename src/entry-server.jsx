// Build-time entry used by scripts/prerender.js (not shipped to the browser).
// Renders each route to static HTML so crawlers and link previews get real
// content, and lists every route for the sitemap.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import projects from "./data/projects.json";
import { NOT_FOUND_META, PAGE_META, projectMeta } from "./pages/pageMeta";
import { renderHeadTags, SITE_URL } from "./utils/seo";

export { SITE_URL };

// Every pre-rendered page. Adding a page: add it here too (the sitemap and the
// static HTML file are generated from this list).
export const ROUTES = [
  { path: "/", meta: PAGE_META.home, changefreq: "weekly", priority: "1.0" },
  { path: "/academic", meta: PAGE_META.academic, changefreq: "monthly", priority: "0.8" },
  { path: "/projects", meta: PAGE_META.projects, changefreq: "monthly", priority: "0.8" },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    meta: projectMeta(project),
    changefreq: "yearly",
    priority: "0.6",
  })),
  { path: "/skills", meta: PAGE_META.skills, changefreq: "monthly", priority: "0.6" },
  { path: "/timeline", meta: PAGE_META.timeline, changefreq: "monthly", priority: "0.6" },
  { path: "/activities", meta: PAGE_META.activities, changefreq: "monthly", priority: "0.6" },
  { path: "/contact", meta: PAGE_META.contact, changefreq: "yearly", priority: "0.5" },
];

// Rendered to 404.html, which static hosts serve for unknown paths.
export const NOT_FOUND = { path: "/404", meta: NOT_FOUND_META };

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export function renderHead(meta) {
  return renderHeadTags(meta);
}
