/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Allows toggling theme via 'dark' class on root element
  theme: {
    extend: {
      colors: {
        game: {
          like: '#10b981', // Emerald green
          dislike: '#ef4444', // Red
          primary: '#6366f1', // Indigo
        }
      },
      animation: {
        'swipe-left': 'swipeLeft 0.5s ease-out forwards',
        'swipe-right': 'swipeRight 0.5s ease-out forwards',
      },
      keyframes: {
        swipeLeft: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-200px) rotate(-15deg)', opacity: '0' },
        },
        swipeRight: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(200px) rotate(15deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
