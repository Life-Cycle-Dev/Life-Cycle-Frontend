/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xl: "420px",
      "2xl": "960px",
    },
    colors: {
      background: "var(--background)",
      backgroundInput: "var(--backgroundInput)",
      primary: "var(--primary)",
      textWhite: "var(--textWhite)",
    },
    fontFamily: {
      sans: ["Public Sans", "sans-serif"],
    },
    fontSize: {
      h1: "36px",
      h2: "20px",
    },
    extend: {},
  },
  plugins: [],
};
