import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import useScrollSpy from "../hooks/useScrollSpy";
import useTheme from "../hooks/useTheme";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Academic", id: "academic" },
  { label: "Projects", id: "projects" },
  { label: "Timeline", id: "timeline" },
  { label: "Contact", id: "contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navContainerRef = useRef(null);

  const navIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const activeSection = useScrollSpy(navIds);

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

  const handleAnchorClick = (event, id) => {
    event.preventDefault();

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    const hero = document.getElementById("hero");

    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${isScrolled ? "navbar--scrolled" : "navbar--top"}`}
    >
      <div className="navbar__inner" ref={navContainerRef}>
        <a href="#hero" className="navbar__logo" onClick={handleLogoClick}>
          Achchuthan
        </a>

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
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleAnchorClick(event, item.id)}
                className={`navbar__link ${isActive ? "navbar__link--active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}

          <button
            type="button"
            className="navbar__theme-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="navbar__theme-icon">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </span>
            {/* <span>{theme === "dark" ? "Light" : "Dark"}</span> */}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
