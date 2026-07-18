import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Home", to: "/", end: true },
  { label: "Academic", to: "/academic" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Timeline", to: "/timeline" },
  { label: "Activities", to: "/activities" },
  { label: "Contact", to: "/contact" },
];

// iOS Safari can dispatch a duplicate `click` on a button whose contents change
// mid-tap (the toggle swaps its ☰/✕ icon on open). That phantom second click
// would instantly reverse the menu, so it opened and closed in one tap. Ignore
// any menu state change that fires within this window of the previous one.
const TAP_GUARD_MS = 400;

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const lastChangeRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Toggle guarded against iOS Safari's duplicate click firing.
  const handleToggle = () => {
    if (Date.now() - lastChangeRef.current < TAP_GUARD_MS) {
      return;
    }
    lastChangeRef.current = Date.now();
    setIsMenuOpen((open) => !open);
  };

  // Outside/backdrop close, also guarded so a phantom event right after opening
  // can't immediately dismiss the menu.
  const closeFromBackdrop = () => {
    if (Date.now() - lastChangeRef.current < TAP_GUARD_MS) {
      return;
    }
    setIsMenuOpen(false);
  };

  // Intentional close (nav link / logo) — always closes so navigation feels
  // immediate.
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`navbar ${isScrolled ? "navbar--scrolled" : "navbar--top"}`}
      >
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <img className="navbar__logo-mark" src="/favicon.svg" alt="" />
            <span className="navbar__logo-text">Achchuthan</span>
          </Link>

          <button
            type="button"
            className="navbar__toggle"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            onClick={handleToggle}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav
            className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              className="navbar__theme-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className="navbar__theme-icon">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </span>
              <span className="navbar__theme-text">
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="navbar__backdrop"
          aria-hidden="true"
          onClick={closeFromBackdrop}
        ></div>
      )}
    </>
  );
}

export default Navbar;
