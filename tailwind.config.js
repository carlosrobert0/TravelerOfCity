/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        barlow: 'Barlow, sans-serif',
        heebo: 'Heebo, sans-serif',
        roboto: 'Roboto, sans-serif',
      },
      colors: {
        brand: {
          blue: '#115D8C',
          orange: '#F25D27',
        },

        title: '#123952',
        text: '#617480',
        complement: '#A0ACB2',

        shape: '#FFFFFF',
        shape_secondary: '#DCE2E5',

        attention: '#DE3838',
        attention_light: '#FFE1E1',
        success: '#51B853',
        success_light: '#DCF5DD',
        blue_light: '#DDE9F0',
        orange_light: '#FEF7F5',
        orange_border: '#F1BEAC',
        yellow: '#EFB866',
        new_yellow: '#F5A300',

        background: '#F5F8FA',
        background_secondary: '#DCE2E6',
        background_dark: '#120e0e',
      },
    },
  },
  plugins: [],
};
