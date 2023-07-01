/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        success: '#5bc908',
        error: '#a80b0b',
        info: '#1888ff',
        'primary': '#003049',
        secondary: '#fcbf49',
        'base-100': '#eae2b7',
        'latest': '#d62828',
        'primary-black': '#003049'
      }
    },
  },
  plugins: [],
}