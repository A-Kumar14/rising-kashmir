"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rk-theme";

function readTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded border border-theme px-2 py-0.5 text-utility font-medium text-[var(--text-secondary)] transition-opacity duration-120 hover:opacity-80"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
