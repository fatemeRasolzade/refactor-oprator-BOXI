/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "570px",
        "Max-2xl": { max: "1535px" },
        "Max-xl": { max: "1279px" },
        "Max-lg": { max: "1023px" },
        "Max-md": { max: "767px" },
        "Max-sm": { max: "576px" },
      },
      colors: {
        light: "#ffffff",
        dark: "#282827",
        lightesGray: "#F4F4F4",
        tableColor: "rgb(231, 229, 229)",
        grayLight: "#E0E0E2",
        gray: colors.slate,
        blue: colors.sky,
        red: colors.rose,
        green: colors.emerald,
        secondaryColor: "#FFF3E5",
        secondaryTextColor: "#2E2310",
        mainColor: "#EF5644",
        customeTextColor: "#818181",
        grayLights: "#F9FAFC",
        tomato: {
          light: "#cf6054",
          DEFAULT: "#EF5644",
          dark: "#b5382a",
        },
      },
      fontFamily: {
        shabnam: ["yekan", "Roboto", "Arial", "sans-serif"],
      },
    },
  },

  plugins: [require('flowbite/plugin')],
});
