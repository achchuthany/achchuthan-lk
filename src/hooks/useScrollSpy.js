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

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          );

        if (visibleEntries[0]?.target?.id) {
          setActiveSectionId(visibleEntries[0].target.id);
        }
      },
      {
        threshold: 0.4,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSectionId;
}

export default useScrollSpy;
