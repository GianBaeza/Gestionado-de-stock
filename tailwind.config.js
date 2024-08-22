/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1a1a1a",
        "dark-text": "#ffffff",
        "light-bg": "#ffffff",
        "light-text": "#000000",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
