/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translate3d(-50px, 0, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          '100%': { opacity: 0, transform: 'translate3d(-50px, 0, 0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 5.5s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

