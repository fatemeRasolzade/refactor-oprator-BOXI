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
        darkBorder: "#ABABAB",
        darkGray: "#525252",
        lightGray: "#F9FAFC",
        mainGray: "#e7e5e5",
        tomato: "#EF5644",
        lightTomato: "#FFEAE9",
        red: " #DF2040",
        green: "#3AA65E",
      },
      fontFamily: {
        shabnam: ["yekan", "Roboto", "Arial", "sans-serif"],
        Julee: ["Julee", "sans-serif"],
      },
    },
  },

  plugins: [],
});
