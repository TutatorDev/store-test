/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f7fc",
          100: "#e2eef7",
          200: "#cce0f1",
          300: "#a9cde7",
          400: "#7fb3db",
          500: "#6198d0",
          600: "#4c7fc2",
          700: "#436db2",
          800: "#3c5a91",
          900: "#344d74",
          950: "#233048",
        },
        secondary: {
          50: "#fbf7fc",
          100: "#f5eff8",
          200: "#ebdef0",
          300: "#ddc4e3",
          400: "#c8a0d2",
          500: "#af7abb",
          600: "#965da2",
          700: "#794982",
          800: "#643d6b",
          900: "#553659",
          950: "#341b37",
        },
        bgligth: "#F3EDE5",
        bgdark: "#2A2826",
      },
    },
  },
  plugins: [],
  darkMode: ["class"],
};
