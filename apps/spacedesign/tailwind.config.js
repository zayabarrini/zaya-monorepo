/** @type {import('tailwindcss').Config} */
export default {
  // prefix: 'tw-', // Add a prefix to all Tailwind classes
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  mode: 'aot',
  theme: {
    extend: {
      colors: {
        "dark-background": "rgb(13,21,30)",
        // "bg-dark-background": "#243c5a"
        // "icon-filter": "none",
        // "dark-background-color": "#333333",
        // "dark-text-color": "#ffffff",
        // "dark-border-color": "#374151",
        // "dark-icon-filter": "invert(1)",
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ]
};


// "dark-background": "#0F161E"

