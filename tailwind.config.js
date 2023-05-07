/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "oha-pattern": "url('src/assets/oha-bg.png')",
      },
    },
  },
  plugins: [],
};
