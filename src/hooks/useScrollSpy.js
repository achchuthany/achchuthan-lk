import { useEffect, useState } from "react";

function useScrollSpy(sectionIds) {
  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);

    if (!sections.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const offsetTop = 110;
      let nextActiveId = sections[0].id;
      const pageBottomOffset = 4;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top - offsetTop <= 0) {
          nextActiveId = section.id;
        }
      });

      const viewportBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;

      if (viewportBottom >= documentBottom - pageBottomOffset) {
        nextActiveId = sections[sections.length - 1].id;
      }

      setActiveSectionId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId,
      );
    };

    updateActiveSection();

    const observer = new IntersectionObserver(
      () => {
        updateActiveSection();
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-45% 0px -45% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSectionId;
}

export default useScrollSpy;
