import { useEffect } from "react";
import { getHeadTags } from "../utils/seo";

function upsertMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
}

function upsertJsonLd(data) {
  let script = document.getElementById("person-jsonld");

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "person-jsonld";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

// Keeps <head> in sync with the current route. Pre-rendered pages already ship
// these tags in their HTML; this updates them on client-side navigation.
function SEOHead({ title, description, canonical, noindex = false }) {
  useEffect(() => {
    const tags = getHeadTags({ title, description, canonical, noindex });

    document.title = tags.title;
    tags.meta.forEach(([attribute, key, content]) =>
      upsertMeta(attribute, key, content),
    );
    upsertCanonical(tags.canonical);
    upsertJsonLd(tags.jsonLd);
  }, [title, description, canonical, noindex]);

  return null;
}

export default SEOHead;
