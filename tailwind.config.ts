import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["30px", { lineHeight: "1.2" }],
        "section-title": ["24px", { lineHeight: "1.25" }],
        "strip-header": ["18px", { lineHeight: "1.25" }],
        "card-lg": ["17px", { lineHeight: "1.3" }],
        "card-md": ["14px", { lineHeight: "1.3" }],
        "body": ["15px", { lineHeight: "1.5" }],
        "dek": ["13px", { lineHeight: "1.5" }],
        "byline": ["12px", { lineHeight: "1.4" }],
        "eyebrow": ["11px", { lineHeight: "1" }],
        "nav": ["14px", { lineHeight: "1" }],
        "utility": ["12px", { lineHeight: "1.4" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionDuration: {
        "120": "120ms",
        "180": "180ms",
      },
    },
  },
  plugins: [],
};

export default config;
