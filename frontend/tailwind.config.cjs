/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "1stcolor": "#292929",
        "2ndcolor": "#efc700",
        "3rdcolor": "#f3f3f3",
      }
    },
  },
  plugins: [],
}
