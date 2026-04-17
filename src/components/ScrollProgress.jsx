import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./ScrollProgress.css";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        documentHeight > 0 ? Math.min((scrollTop / documentHeight) * 100, 100) : 0;

      setProgress(nextProgress);
      setShowBackToTop(scrollTop > 320);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div
          className="scroll-progress__bar"
          style={{ transform: `scaleX(${progress / 100})` }}
        ></div>
      </div>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? "back-to-top--visible" : ""}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
    </>
  );
}

export default ScrollProgress;
