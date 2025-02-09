/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffebff",
        playground: "#052255",
        black: "#333333",
        red: "#F70300",
        lightGray: '#B0B0B0',
        lightBlueBg: '#F2F5F7',
      },
      fontFamily: {
        poppins: ['Poppins', ...fontFamily.sans],
        roboto: ['Roboto', ...fontFamily.sans]
      }
    },
  },
  plugins: [],
};
