"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "rk-theme";
const ACCENT_HUE_KEY = "rk-accent-hue";

export type RkTheme = "light" | "dark" | "sepia";

function readTheme(): RkTheme {
  if (typeof document === "undefined") return "light";
  const t = document.documentElement.getAttribute("data-theme");
  if (t === "dark" || t === "sepia" || t === "light") return t;
  return "light";
}

function applyAccent() {
  const html = document.documentElement;
  const theme = html.getAttribute("data-theme") || "light";
  let hue = 25;
  try {
    const raw = localStorage.getItem(ACCENT_HUE_KEY);
    if (raw && !Number.isNaN(Number(raw))) hue = Number(raw);
  } catch {
    /* ignore */
  }
  html.style.setProperty(
    "--accent",
    theme === "dark"
      ? `oklch(0.65 0.14 ${hue})`
      : `oklch(0.45 0.14 ${hue})`,
  );
}

export function RkThemeAccent() {
  useEffect(() => {
    applyAccent();
    const obs = new MutationObserver(() => applyAccent());
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    function onStorage(e: StorageEvent) {
      if (e.key === THEME_KEY || e.key === ACCENT_HUE_KEY) applyAccent();
    }
    window.addEventListener("storage", onStorage);
    return () => {
      obs.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return null;
}

type CycleLabels = { light: string; dark: string; sepia: string };

export function RkThemeCycle({ labels }: { labels: CycleLabels }) {
  const [theme, setTheme] = useState<RkTheme>("light");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function cycle() {
    const order: RkTheme[] = ["light", "dark", "sepia"];
    const next = order[(order.indexOf(readTheme()) + 1) % order.length];
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
    applyAccent();
    setTheme(next);
  }

  const label =
    theme === "dark" ? labels.dark : theme === "sepia" ? labels.sepia : labels.light;

  return (
    <button
      type="button"
      className="rk-util__link"
      onClick={cycle}
      title="Cycle theme: light, dark, sepia"
    >
      {label}
    </button>
  );
}
