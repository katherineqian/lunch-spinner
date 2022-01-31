const colors = require('tailwindcss/colors')

module.exports = {
  content: [    "./pages/**/*.{js,ts,jsx,tsx}",    "./components/**/*.{js,ts,jsx,tsx}",  ],
  theme: {
    screens: {
      'xs': '470px',
    },
    extend: { 
      colors: {
        primary: "#474ccb"
      },
    },
  },
  plugins: [],
}
