/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#7C3AED",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
          800: "#4C1D95",
          900: "#3B0764",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        surface: "#F8FAFC",
        background: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "card": "0 4px 8px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 16px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};