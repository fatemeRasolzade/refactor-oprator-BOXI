/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const withMT = require("@material-tailwind/react/utils/withMT");



module.exports = withMT({

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
      tomato:"#EF5644"
     
    },
    extend: {
      screens: {
        sm: "570px",
        "Max-2xl": { max: "1535px" },
        "Max-xl": { max: "1279px" },
        "Max-lg": { max: "1023px" },
        "Max-md": { max: "767px" },
        "Max-sm": { max: "576px" },
      },
     
      fontFamily: {
        shabnam: ["yekan", "Roboto", "Arial", "sans-serif"],
      },
     
      dark: {
        DEFAULT: "#000000",
      },
      white: {
        DEFAULT: "#ffffff",
      },
      grayColor: {
        light: "#8f8b8b",
        DEFAULT: "#707070",
        dark: "#484848",
      },
      textColor: {
        light: "#545151",
        DEFAULT: "#242424",
        dark: "#000000",
      },
      magenta: {
        light: "#ed6e83",
        DEFAULT: "#DF2040",
        dark: "#b3122d",
      },
      greenLight: {
        light: "#57c77c",
        DEFAULT: "#36BC62",
        dark: "#279b4d",
      },
      lightGray: {
        light: "#c5c1c1",
        DEFAULT: "#ABABAB",
        dark: "#939191",
      },
      numColor: {
        DEFAULT: "#0D0D0D",
      },
      darkGray: {
        DEFAULT: "#505A73",
      },
      orangeColor: {
        DEFAULT: "#EF5644",
      },
      purpleColor: {
        light: "#ff08b6",
        DEFAULT: "#D00695",
        dark: "#a50375",
      },
      redLight: {
        DEFAULT: "#A30029",
        dark: "#830323",
        light: "#cb0537",
      },
      blueLight: {
        DEFAULT: "#007BFF",
        dark: "#045fc1",
        light: "#3779c1",
      },
      redColor: {
        DEFAULT: "#DC0000",
        dark: "#a50202",
        light: "#ff5252",
      },
      lighterGray: {
        DEFAULT: "#7F87A4",
        dark: "#585d70",
        light: "#9da6c5",
      },
      lighterBlue: {
        DEFAULT: "#4BA2FF",
        dark: "#2b7fd9",
        light: "#6badf5",
      },
      lighterPurple: {
        DEFAULT: "#D00695",
        dark: "#a90679",
        light: "#db58b5",
      },
      yellowColor: {
        DEFAULT: "#FBB03C",
        dark: "#cf8b23",
        light: "#e9b25d",
      },
    },
    extend: {},
  
  

    fontFamily: {
      shabnam: ["yekan", "Roboto", "Arial", "sans-serif"],
    },
   

    height: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      85:"85%",
      21:"21px",
      93:"93px",
      38: "38px",
      40: "40px",
      48: "48px",
      100: "100px",
      87: "87px",
      300: "300px",
      400: "400px",
      "1/2": "50%",
      "2/2": "100%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      73: "73%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    }),
    width: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      "122":"122px",
      "30%": "30%",
      "40%": "40%",
      45: "45%",
      30: "30px",
      40: "40px",
      50:"50px",
      400:"400px",
      230:"230px",
      250:"250px",
      351:"351px",
      258: "258px",
      219: "219px",
      160: "160px",
      10: "10%",
      70:"70%",
      17: "17%",
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      screen: "100vw",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      fill:"-webkit-fill-available"
    }),

  },

  plugins: [],
});
