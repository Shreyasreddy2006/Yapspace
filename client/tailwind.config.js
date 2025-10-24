/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yapspace-yellow': '#F5E050',
        'yapspace-dark': '#333',
        'yapspace-light': '#FFF8DC',
        'yapspace-accent': '#FFD700',
        'yapspace-shadow': 'rgba(245, 224, 80, 0.3)',
      },
      fontFamily: {
        'righteous': ['Righteous', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
        'creative': ['Righteous', 'cursive'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['2rem', { lineHeight: '1.3' }],
        'subtitle': ['1.25rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'pill': '9999px',
        'xl-pill': '1rem',
        '2xl-pill': '1.5rem',
      },
      boxShadow: {
        'yapspace': '0 10px 25px -5px rgba(245, 224, 80, 0.3), 0 10px 10px -5px rgba(245, 224, 80, 0.1)',
        'yapspace-lg': '0 20px 40px -10px rgba(245, 224, 80, 0.4), 0 10px 20px -5px rgba(245, 224, 80, 0.2)',
        'yapspace-xl': '0 25px 50px -12px rgba(245, 224, 80, 0.5)',
        'dramatic': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(245, 224, 80, 0.1)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.8s ease-out',
        'slideDown': 'slideDown 0.8s ease-out',
        'bounceIn': 'bounceIn 0.8s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3) translateY(20px)' },
          '50%': { opacity: '1', transform: 'scale(1.05) translateY(-5px)' },
          '70%': { transform: 'scale(0.95) translateY(0)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 224, 80, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 224, 80, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
