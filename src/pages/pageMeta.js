import profile from "../data/profile.json";

const SITE_URL = "https://achchuthan.lk";

// Per-route SEO metadata. `SEOHead` reads these to keep the document title,
// meta description, Open Graph tags, and canonical URL in sync with the page.
export const PAGE_META = {
  home: {
    title: `${profile.name} — Instructor & Software Engineer`,
    description:
      "Computer technology instructor focused on practical systems, networking, and software engineering, building mobile solutions for academia and SMEs.",
    canonical: `${SITE_URL}/`,
  },
  academic: {
    title: `Academic — ${profile.name}`,
    description:
      "Teaching, courses, administrative roles, education, and peer-reviewed research by Yogarajah Achchuthan.",
    canonical: `${SITE_URL}/academic`,
  },
  projects: {
    title: `Projects — ${profile.name}`,
    description:
      "Systems and products built for education and operations, including student information and enrollment systems.",
    canonical: `${SITE_URL}/projects`,
  },
  skills: {
    title: `Skills — ${profile.name}`,
    description:
      "Backend, frontend, mobile, and infrastructure technologies used across teaching and software work.",
    canonical: `${SITE_URL}/skills`,
  },
  timeline: {
    title: `Timeline — ${profile.name}`,
    description:
      "Experience across academic and software engineering roles from 2015 to today.",
    canonical: `${SITE_URL}/timeline`,
  },
  activities: {
    title: `Activities — ${profile.name}`,
    description:
      "Conferences, workshops, creative design output, and institutional development work.",
    canonical: `${SITE_URL}/activities`,
  },
  contact: {
    title: `Contact — ${profile.name}`,
    description:
      "Get in touch for teaching collaborations, freelance web projects, and research partnerships.",
    canonical: `${SITE_URL}/contact`,
  },
};
