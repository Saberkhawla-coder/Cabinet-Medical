// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define the keyframes for the movement and opacity change
      keyframes: {
        slideOutLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      // Map the keyframes to utility classes (e.g., animate-slideOutLeft)
      animation: {
        slideOutLeft: 'slideOutLeft 0.4s ease-in-out forwards',
        slideInLeft: 'slideInLeft 0.4s ease-in-out forwards',
        slideOutRight: 'slideOutRight 0.4s ease-in-out forwards',
        slideInRight: 'slideInRight 0.4s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}