import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll position to the top whenever the route changes so each page
// opens from its heading rather than inheriting the previous scroll offset.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
