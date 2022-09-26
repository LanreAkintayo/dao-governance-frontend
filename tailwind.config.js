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
      "ssm": '486px',
      ...defaultTheme.screens,
    },
    extend: {
      opacity:["disabled"],
      cursor: ["disabled"],
      colors: {
        peach: "#FCF6F5FF",
        royalBlue: "#990011FF",
      }
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      // // logo: ['Rampart One', "cursive"]
      logo: ['Germania One', 'cursive']
    },
  
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
