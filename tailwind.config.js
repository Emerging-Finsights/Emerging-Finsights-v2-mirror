module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // Legacy colours
        'efs-beige': '#fffff1',
        'efs-red': '#ca6562',
        'efs-gray': '#7f7f7f',
        'efs-turq': '#a5d4d9',
        'efs-logo': '#63A8A6',
        'efs-brown': '#836B52',
        'efs-green': '#88A863',
        'efs-orange': '#E69400',
        'efs-salmon': '#F3686A',
        'efs-new-blue-100': "#E9F3E8",
        'efs-new-blue-200': "#D6E8DE",
        'efs-new-blue-300': "#BBD6CE",
        'efs-new-blue-400': "#8DC0BE",
        'efs-new-blue-500': "#63A8A6",
        'efs-new-red-100': "#D09896",
        'efs-new-red-200': "#D05353",
        'efs-new-green-100': "#CFE2B8",
        'efs-new-green-200': "#88A863",
        'efs-new-brown-100': "#B8A295",
        'efs-new-brown-200': "#967764",
        'efs-new-gray-100': "#F2F2F2",
        'efs-new-gray-200': "#9F9F9F",
        'efs-new-gray-300': "#777777",
        'efs-new-white-100': "#FFFFF2",
      },
      borderRadius: {
        'xl': '2.75rem'
      },
      screens: {
        '3xl': '1916px',
      },
      height: {
        '100': '28rem'
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-in forwards"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
  daisyui: {
    themes: false,
    darkMode: "light" // disable darkmode
  },
}
