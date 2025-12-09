/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
      },
      colors: {
        'uh-red': '#EF4444',
        'uh-blue': '#3B82F6',
        'uh-orange': '#F97316',
        'uh-green': '#22C55E',
        'uh-yellow': '#EAB308',
        'uh-purple': '#A855F7',
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
        'dark-text': '#e2e8f0',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-once': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'pulse-once': 'pulse-once 0.5s ease-in-out',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
