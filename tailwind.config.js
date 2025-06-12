/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './dist/**/*.html'],
  theme: {
    
    extend: {

      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin .5s linear infinite',
      }
      
    }
  },
  plugins: [],
} 