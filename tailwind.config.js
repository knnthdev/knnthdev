/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/app/routes/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        border_line : "var(--border-line)",
        primary : "var(--text-primary)",
        secondary : "var(--text-secondary)",
        hoverbutton : "var(--hover-button)",
        hoverfigcaption : "var(--hover-figcaption)",
      },
    },
  },
  plugins: [],
  purge: ["./src/app/routes/**/*.{html,ts,sass,css,scss}"]
}

