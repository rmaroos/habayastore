/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F2E8',
        parchment: '#EDE2D0',
        linen: '#D9C8B2',
        ink: {
          DEFAULT: '#30251F',
          soft: '#5C4D42',
        },
        burgundy: {
          DEFAULT: '#55252D',
          dark: '#431C23',
        },
        brass: '#A88956',
        olive: '#77765B',
        warm: '#FCFAF5',
        taupe: '#8A796A',
        rule: '#D8CDBE',
        success: '#3D5A36',
        danger: '#9B2C2C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Libre Baskerville"', 'Georgia', 'serif'],
        body: ['Lato', 'Inter', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
};
