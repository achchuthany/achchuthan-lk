import { useSyncExternalStore } from "react";

const STORAGE_KEY = "preferred-theme";
const CHANGE_EVENT = "themechange";

// The inline script in index.html sets `data-theme` on <html> before first
// paint (stored choice, else system preference), so there is no light-mode
// flash. This hook treats that attribute as the source of truth.

function readStoredTheme() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

// Pre-rendered HTML can't know the visitor's theme; hydration starts from this
// value and React then re-renders with the real one from getSnapshot.
function getServerSnapshot() {
  return "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Follow the OS setting only while the visitor hasn't picked a theme.
  const onSystemChange = () => {
    if (!readStoredTheme()) {
      applyTheme(getSystemTheme());
    }
  };

  window.addEventListener(CHANGE_EVENT, onChange);
  mediaQuery.addEventListener("change", onSystemChange);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    mediaQuery.removeEventListener("change", onSystemChange);
  };
}

function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode); the choice lasts for this visit.
    }
    applyTheme(next);
  };

  return { theme, toggleTheme };
}

export default useTheme;
