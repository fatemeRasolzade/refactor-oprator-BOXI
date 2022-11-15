/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      inset:{
        '0':'0px',
        '3':'3px',
        '5':'5px',
        '9' :'9px',
        '10':'10px',
        '15':'15px',
        '20':'20px',
        '30':'30px',
        '40':'40px',
        '50':'50px',
        '60':'60px',
        '70':'70px',
      },
  
      screens: {
        sm: '570px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        
        'Max-2xl': {'max': '1535px'},
     

      'Max-xl': {'max': '1279px'},
      

      'Max-lg': {'max': '1023px'},
     

      'Max-md': {'max': '767px'},
      

      'Max-sm': {'max': '576px'},
      
      },
  
      colors:{
        tableColor:'rgb(231, 229, 229)',
        grayLight:'#E0E0E2',
        gray: colors.slate,
				blue: colors.sky,
				red: colors.rose,
				green: colors.emerald,
				secondaryColor:"#FFF3E5",
				secondaryTextColor:"#2E2310",
				mainColor:"#EF5644",
        light:{
          DEFAULT:"#d1d1d1"
        },

        tomato:{
          light:"#cf6054",
        DEFAULT:"#EF5644",
        dark:"#b5382a"
        },
        halfDark:{
          light:"#4e4d4d",
        DEFAULT:"#3B3B3B",
        dark:"#100f0f"
        },
        dark:{
        
        DEFAULT:"#000000",
        
        },
        white:{
         
        DEFAULT:"#ffffff",
        
        },
        grayColor:{
          light:"#8f8b8b",
        DEFAULT:"#707070",
        dark:"#484848"
        },
        textColor:{
          light:"#545151",
        DEFAULT:"#242424",
        dark:"#000000"
        },
        magenta:{
          light:"#ed6e83",
        DEFAULT:"#DF2040",
        dark:"#b3122d"
        },
        greenLight:{
          light:"#57c77c",
        DEFAULT:"#36BC62",
        dark:"#279b4d"
        },
        lightGray:{
          light:"#c5c1c1",
        DEFAULT:"#ABABAB",
        dark:"#939191"
        },
        numColor:{
        DEFAULT:"#0D0D0D",
        },
      darkGray:{
        DEFAULT:'#505A73'
    },
    orangeColor:{
      DEFAULT:'#EF5644'
    },
    purpleColor:{
      light:"#ff08b6",
      DEFAULT:'#D00695',
      dark:"#a50375"
    },
    redLight:{
      DEFAULT:'#A30029',
      dark:"#830323",
      light:"#cb0537"
    },
    blueLight:{
      DEFAULT:'#007BFF',
      dark:"#045fc1",
      light:"#3779c1"
    },
    redColor:{
      DEFAULT:'#DC0000',
      dark:"#a50202",
      light:"#ff5252"
    },
    lighterGray:{
      DEFAULT:'#7F87A4',
      dark:"#585d70",
      light:"#9da6c5"
    },
    lighterBlue:{
      DEFAULT:'#4BA2FF',
      dark:"#2b7fd9",
      light:"#6badf5"
    },
    lighterPurple:{
      DEFAULT:'#D00695',
      dark:"#a90679",
      light:"#db58b5"
    },
    yellowColor:{
      DEFAULT:'#FBB03C',
      dark:"#cf8b23",
      light:"#e9b25d"
    }
  
      },
      extend: {
        
      },
      columns:{
        auto: 'auto',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        '3xs': '16rem',
        '2xs': '18rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },
      spacing: {
        px: '1px',

        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
      
     
      brightness: {
        0: '0',
        50: '.5',
        75: '.75',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
        200: '2',
      },
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        DEFAULT: theme('colors.lightGray', 'currentColor'),
      }),
      borderRadius: {
        '12':'12px',
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
     
      borderWidth: {
        DEFAULT: '1px',
        0: '0px',
        1:'1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      boxShadow: {
        sm: '0 0 2px 1px #a7a7a7',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: 'none',
      },
      cursor: {
        auto: 'auto',
        default: 'default',
        pointer: 'pointer',
        wait: 'wait',
        text: 'text',
        move: 'move',
        help: 'help',
        'not-allowed': 'not-allowed',
        none: 'none',
        'context-menu': 'context-menu',
        progress: 'progress',
        cell: 'cell',
        crosshair: 'crosshair',
        'vertical-text': 'vertical-text',
        alias: 'alias',
        copy: 'copy',
        'no-drop': 'no-drop',
        grab: 'grab',
        grabbing: 'grabbing',
        'all-scroll': 'all-scroll',
        'col-resize': 'col-resize',
        'row-resize': 'row-resize',
        'n-resize': 'n-resize',
        'e-resize': 'e-resize',
        's-resize': 's-resize',
        'w-resize': 'w-resize',
        'ne-resize': 'ne-resize',
        'nw-resize': 'nw-resize',
        'se-resize': 'se-resize',
        'sw-resize': 'sw-resize',
        'ew-resize': 'ew-resize',
        'ns-resize': 'ns-resize',
        'nesw-resize': 'nesw-resize',
        'nwse-resize': 'nwse-resize',
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
      },
     
    
    
     
      flex: {
        1: '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
      },
      
      
      fontFamily:{
        shabnam:['shabnam','Roboto','Arial','sans-serif']
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
    
    
      gridColumn: {
        auto: 'auto',
        'span-1': 'span 1 / span 1',
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-full': '1 / -1',
      },
      
      gridRow: {
        auto: 'auto',
        'span-1': 'span 1 / span 1',
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
        'span-full': '1 / -1',
      },
      gridRowStart: {
        auto: 'auto',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
      },
      gridRowEnd: {
        auto: 'auto',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
      },
     
      height: ({ theme }) => ({
        auto: 'auto',
        ...theme('spacing'),
        '38':'38px',
        '40':'40px',
        '48':'48px',
        '100':'100px',
        '87':'87px',
        '300':'300px',
        '400':'400px',
        '1/2': '50%',
        '2/2': '100%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '73': '73%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        full: '100%',
        screen: '100vh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      }),
     
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
      },
      margin: ({ theme }) => ({
        auto: 'auto',
        ...theme('spacing'),
      }),
      maxHeight: ({ theme }) => ({
        ...theme('spacing'),
        full: '100%',
        screen: '100vh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      }),
      maxWidth: ({ theme, breakpoints }) => ({
        none: 'none',
        0: '0rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
        prose: '65ch',
        ...breakpoints(theme('screens')),
      }),
      minHeight: {
        0: '0px',
        full: '100%',
        screen: '100vh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      minWidth: {
        0: '0px',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      },
      opacity: {
        0: '0',
        5: '0.05',
        10: '0.1',
        20: '0.2',
        25: '0.25',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        90: '0.9',
        95: '0.95',
        100: '1',
      },
      order: {
        first: '-9999',
        last: '9999',
        none: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
      padding: ({ theme }) => theme('spacing'),
      placeholderColor: ({ theme }) => theme('colors'),
     
     
    
     
      rotate: {
        0: '0deg',
        1: '1deg',
        2: '2deg',
        3: '3deg',
        6: '6deg',
        12: '12deg',
        45: '45deg',
        90: '90deg',
        180: '180deg',
      },
      scale: {
        0: '0',
        50: '.5',
        75: '.75',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
      },
      space: ({ theme }) => ({
        ...theme('spacing'),
      }),
      
      textColor: ({ theme }) => theme('colors'),
      textDecorationColor: ({ theme }) => theme('colors'),
      textDecorationThickness: {
        auto: 'auto',
        'from-font': 'from-font',
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      textUnderlineOffset: {
        auto: 'auto',
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      
      translate: ({ theme }) => ({
        ...theme('spacing'),
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        full: '100%',
      }),
      width: ({ theme }) => ({
        auto: 'auto',
        ...theme('spacing'),
        
        '30%':'30%',
        '40%':'40%',
        '45':'45%',
        '30':'30px',
        '40':'40px',
        '258':'258px',
        '219':'219px',
        '160':'160px',
        '10':'10%',
        '17':'17%',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        full: '100%',
        screen: '100vw',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      }),
     
      zIndex: {
        auto: 'auto',
        0: '0',
        5 : '5',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
      },
    
    },
    
    plugins: [],
  }
  