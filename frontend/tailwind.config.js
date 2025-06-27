/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1.5s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        }
      },
      screens: {
        'xs': '480px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1280px',
        'xl': '1440px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 