import { useEffect, useRef } from "react";
import { MotionConfig, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ScrollToTop from "./ScrollToTop";
import "./Layout.css";

const MotionMain = motion.main;

// Shared shell for every route: skip link, sticky navbar, scroll progress +
// back-to-top, a route-keyed animated <main> that fades each page in, and the
// footer. `MotionConfig reducedMotion="user"` turns off transform/layout
// animations for visitors who ask their OS for reduced motion.
function Layout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const isFirstRender = useRef(true);

  // Move keyboard / screen-reader focus to the new page after client-side
  // navigation (skipped on first load so the browser's default focus wins).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />

        <MotionMain
          key={location.pathname}
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className="app-main"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Outlet />
        </MotionMain>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default Layout;
