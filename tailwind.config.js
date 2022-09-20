/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'ss': '384px',

      ...defaultTheme.screens,
    },
    extend: {
      opacity:["disabled"],
      cursor: ["disabled"],
    },
    fontFamily: {
      sans: ["Kanit", "sans-serif"],
      // // logo: ['Rampart One', "cursive"]
      // logo: ['Germania One', 'cursive']
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
