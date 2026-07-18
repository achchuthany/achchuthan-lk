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

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navContainerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
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

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const onPointerDown = (event) => {
      if (!navContainerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`navbar ${isScrolled ? "navbar--scrolled" : "navbar--top"}`}
    >
      <div className="navbar__inner" ref={navContainerRef}>
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          Achchuthan
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
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
            <span>
              {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
