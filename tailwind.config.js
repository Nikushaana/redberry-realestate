/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tiny': "470px",
        'sm': "640px",
        'md': "770px",
        'lg': "1024px",
        'xl': "1280px",
        '2xl': "1540px"
      },
      colors: {
        'defaultBg': '#DBDBDB',
        'defOrng': '#F93B1D',
        'defOrngHvr': '#DF3014',
        'defGray': '#808A93',
        'defGrayTrans': '#021526B2',
        'defFltrAct': '#F3F3F3',
        'defGreen': '#45A849',
        'defblack': '#021526',
        'defTranspblack': '#02152680',
        'defTranspblackText': '##021526B2',


      },
    },
  },
  plugins: [],
}

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {
      
//     },
//   },
//   plugins: [],
// }

