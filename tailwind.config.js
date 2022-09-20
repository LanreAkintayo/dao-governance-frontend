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
      sans: ["Montserrat", "sans-serif"],
      // // logo: ['Rampart One', "cursive"]
      logo: ['Germania One', 'cursive']
    },
    colors: {
      peach: "#EEA47FFF",
      royalBlue: "#00539CFF"
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
