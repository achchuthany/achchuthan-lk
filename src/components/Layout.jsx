import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ScrollToTop from "./ScrollToTop";

const MotionMain = motion.main;

// Shared shell for every route: sticky navbar, scroll progress + back-to-top,
// a route-keyed animated <main> that fades each page in, and the footer.
function Layout() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />

      <MotionMain
        key={location.pathname}
        className="app-main"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Outlet />
      </MotionMain>

      <Footer />
    </div>
  );
}

export default Layout;
