/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './dist/**/*.html', "./resources/**/*.blade.php", "./resources/**/*.js", "./resources/**/*.vue",],
    theme: {
        extend: {
            width: {
                '7/10': '70%',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'spin-fast': 'spin .5s linear infinite',
            },
            // No need to explicitly define colors if using Tailwind's defaults
        }
    },
    plugins: [],
    // Safelist specific color classes to ensure they're included
    safelist: [
        'text-green-400',
        'text-blue-400'
    ]
}