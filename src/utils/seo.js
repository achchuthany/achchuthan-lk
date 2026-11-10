import profile from "../data/profile.json";

export const SITE_URL = "https://achchuthan.lk";
export const SITE_NAME = profile.name;
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

// schema.org Person record, emitted as JSON-LD on every page so search engines
// can connect the site to its owner and social profiles.
export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.tagline,
  description: profile.bio,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.split(",")[0].trim(),
    addressCountry: profile.location.split(",").pop().trim(),
  },
  sameAs: [profile.github, profile.linkedin, profile.researchgate].filter(
    Boolean,
  ),
};

// Every head tag a page needs, as plain data. `SEOHead` applies these in the
// browser and `scripts/prerender.js` serialises them into static HTML, so both
// stay in sync from one definition.
export function getHeadTags({ title, description, canonical, noindex = false }) {
  return {
    title,
    canonical,
    meta: [
      ["name", "description", description],
      ["name", "robots", noindex ? "noindex" : "index, follow"],
      ["property", "og:site_name", SITE_NAME],
      ["property", "og:type", "website"],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:url", canonical],
      ["property", "og:image", OG_IMAGE],
      ["property", "og:image:width", "1200"],
      ["property", "og:image:height", "630"],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
      ["name", "twitter:image", OG_IMAGE],
    ],
    jsonLd: PERSON_JSON_LD,
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Serialise head tags to an HTML string (used at build time by prerender).
export function renderHeadTags(meta) {
  const tags = getHeadTags(meta);
  const json = JSON.stringify(tags.jsonLd).replace(/</g, "\\u003c");

  return [
    `<title>${escapeHtml(tags.title)}</title>`,
    ...tags.meta.map(
      ([attr, key, content]) =>
        `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`,
    ),
    `<link rel="canonical" href="${escapeHtml(tags.canonical)}" />`,
    `<script type="application/ld+json" id="person-jsonld">${json}</script>`,
  ].join("\n    ");
}
