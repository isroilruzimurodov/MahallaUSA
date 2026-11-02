import type { Config } from "tailwindcss";

// Values come from the MahallaUSA design system (tokens.json).
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF9F5",        // surface-100
        card: "#FFFFFF",         // surface-200
        quiet: "#F0EBE1",        // surface-300
        "teal-soft": "#E1F0F1",  // primary-soft
        "red-soft": "#F9E5E4",   // accent-soft
        ink: "#1F1B16",
        muted: "#5A5247",        // ink-muted
        line: "#DCD4C6",         // border
        "line-strong": "#6E6557",// border-strong
        teal: { DEFAULT: "#006E7D", strong: "#00525E" },   // primary
        red: { DEFAULT: "#B01C24", strong: "#8C141B" },    // accent (Donate / Enroll only)
        flag: "#1F6A9A",         // secondary
        focus: "#0B4F59",
        success: "#1E6B3A",
        danger: "#9B1C1C",
        night: "#1F1B16",
        "night-muted": "#D9D1C4",
        "teal-light": "#8FD6DE",
      },
      fontFamily: {
        display: ['"Source Serif 4 Variable"', "Georgia", "serif"],
        sans: ['"Source Sans 3"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: { sm: "6px", md: "10px", lg: "16px" },
      maxWidth: { page: "1200px", read: "680px" },
    },
  },
  plugins: [],
} satisfies Config;
