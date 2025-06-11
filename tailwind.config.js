/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {},
  },
  plugins: [],
} 
// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'spin-fast': 'spin .5s linear infinite',
        }
      }
    }
  }
  