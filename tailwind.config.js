/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './dist/**/*.html', "./resources/**/*.blade.php", "./resources/**/*.js", "./resources/**/*.vue",],
    theme: {
        extend: {
          spacing: {
            '32': '8rem', // Ensure 32 is defined
        },
            width: {
                '7/10': '70%',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'spin-fast': 'spin .5s linear infinite',
                'fill': 'fill 1s ease-out forwards',
                'fadeIn': 'fadeIn 0.5s ease-out forwards',
                'glow': 'glow 1.5s ease-in-out infinite alternate',
                'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fill: {
                  '0%': { width: '0%' },
                  '100%': { width: 'var(--target-width)' }
                },
                fadeIn: {
                  '0%': { opacity: '0', transform: 'translateY(10px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                glow: {
                  '0%': { boxShadow: '0 0 5px rgba(79, 70, 229, 0.3)' },
                  '100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)' }
                },
                pulseGlow: {
                  '0%, 100%': { opacity: '0.2' },
                  '50%': { opacity: '0.5' }
                }
            },
            backdropBlur: {
                'xs': '2px',
                'md': '6px',
            }
        }
    },
    plugins: [],
    // Add all color classes used in your skills and projects sections
    safelist: [
        'text-green-400', 'text-blue-400', 'text-blue-600', 'text-green-600', 
        'text-yellow-600', 'text-orange-600', 'bg-red-400', 'bg-orange-400', 
        'bg-yellow-400', 'bg-green-400', 'bg-green-500', 'bg-blue-500', 
        'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-orange-100',
        'bg-purple-100', 'text-blue-800', 'text-green-800', 'text-yellow-800', 'text-orange-800',
        'text-indigo-200', 'text-indigo-300', 'text-teal-100', 'text-teal-200', 'text-teal-300',
        'text-pink-100', 'text-pink-200', 'text-amber-100', 'text-amber-200', 'text-amber-300',
        'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900',
        'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-purple-100', 'text-purple-200', 'text-purple-300',
        'bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900',
        'shadow-indigo-500/20', 'shadow-indigo-500/30', 'shadow-indigo-600/20', 'shadow-indigo-700/30',
        'shadow-teal-500/20', 'shadow-teal-500/30', 'shadow-pink-500/20', 'shadow-pink-500/30',
        'shadow-amber-500/20', 'shadow-amber-500/30', 'shadow-blue-500/20', 'shadow-blue-500/30',
        'shadow-purple-500/20', 'shadow-purple-500/30', 'backdrop-blur-md', 'backdrop-blur-sm',
        'bg-gradient-to-r', 'from-indigo-500', 'from-indigo-600', 'to-indigo-600', 'to-indigo-700',
        'from-purple-500', 'from-purple-600', 'to-purple-500', 'to-purple-600', 'to-purple-700',
        'from-teal-500', 'from-teal-600', 'to-teal-500', 'to-teal-600', 'to-teal-700',
        'from-pink-500', 'from-pink-600', 'to-pink-500', 'to-pink-600', 'to-pink-700',
        'from-amber-500', 'from-amber-600', 'to-amber-500', 'to-amber-600', 'to-amber-700',
        'from-blue-500', 'from-blue-600', 'to-blue-500', 'to-blue-600', 'to-blue-700',
        'blur-lg', 'group-hover:opacity-20', 'group-hover:opacity-30', 'opacity-0', 'opacity-10', 'opacity-20',
        'text-gray-50', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400', 'bg-gray-900', 'bg-gray-950',
        'text-yellow-300', 'text-green-300', 'text-blue-300', 'text-pink-300', 'text-purple-300', 'text-red-300', 
        'bg-gray-800', 'bg-gray-850', 'py-32'
    ]
}