const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': [...defaultTheme.fontFamily.mono]
      },
      colors: {
        background: {
          main: '#CDCBC2',
          muted: '#F0EFEA'
        },
        primary: {
          main: '#111111',
          muted: '#333333'
        }
      }
    },
  },
  plugins: [],
}
