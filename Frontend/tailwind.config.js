/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C41E3A',
        'primary-hover': '#a01830',
        'primary-deep': '#e00034',
        'background-light': '#f8f6f6',
        'background-dark': '#221013',
        'sidebar-dark': '#181112',
        'sidebar-border': '#2a1e1f',
        'ibero-red': '#C41E3A',
        'ibero-dark-red': '#8B0000',
        ink: '#181112',
        'ink-muted': '#896169',
        'ink-soft': '#a3828a',
        surface: '#ffffff',
        'surface-raised': '#fffbfb',
        'surface-warm': '#f4f0f1',
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -16px rgba(24, 17, 18, 0.25)',
        card: '0 1px 0 rgba(24,17,18,0.04)',
        glow: '0 0 0 3px rgba(196, 30, 58, 0.14)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in-right': 'slide-in-right 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.4s linear infinite',
        pulseSoft: 'pulseSoft 2.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
