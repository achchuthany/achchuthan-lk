// Post-build step: renders every route from src/entry-server.jsx into static
// HTML files in dist/, plus 404.html and sitemap.xml.
//
//   /                 -> dist/index.html
//   /projects         -> dist/projects.html
//   /projects/macosys -> dist/projects/macosys.html
//
// Static hosts (Netlify, Cloudflare Pages, GitHub Pages, Vercel with
// `cleanUrls`) serve `/projects` from `projects.html` and fall back to
// `404.html` for unknown paths. The browser bundle then hydrates the page.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");

const template = readFileSync(resolve(distDir, "index.html"), "utf8");
const { ROUTES, NOT_FOUND, SITE_URL, render, renderHead } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

function outputFile(path) {
  return path === "/" ? "index.html" : `${path.slice(1)}.html`;
}

function writePage(path, meta, file) {
  const html = template
    .replace("<!--app-head-->", renderHead(meta))
    .replace("<!--app-html-->", render(path));
  const target = resolve(distDir, file);

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
  console.log(`  prerendered ${path.padEnd(28)} -> dist/${file}`);
}

for (const route of ROUTES) {
  writePage(route.path, route.meta, outputFile(route.path));
}
writePage(NOT_FOUND.path, NOT_FOUND.meta, "404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;
writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);
console.log(`  wrote sitemap.xml with ${ROUTES.length} URLs`);

rmSync(ssrDir, { recursive: true, force: true });
