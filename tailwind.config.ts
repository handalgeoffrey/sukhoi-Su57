import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--base-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-raised": "rgb(var(--surface-raised-rgb) / <alpha-value>)",
        line: "rgb(var(--border-rgb) / <alpha-value>)",
        "line-strong": "rgb(var(--border-strong-rgb) / <alpha-value>)",
        ink: "rgb(var(--text-rgb) / <alpha-value>)",
        muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        dim: "rgb(var(--text-dim-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-soft": "var(--accent-soft)",
        status: "rgb(var(--status-rgb) / <alpha-value>)",
        "status-bright": "rgb(var(--status-bright-rgb) / <alpha-value>)",
        danger: "rgb(var(--danger-rgb) / <alpha-value>)",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      letterSpacing: {
        hud: "0.14em",
        wide: "0.08em",
      },
      maxWidth: {
        shell: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
