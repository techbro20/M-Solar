/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          500: '#f97316', // Orange
          600: '#ea580c',
          700: '#c2410c',
        }
      }
    },
  },
  plugins: [],
}