/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#c40e2f',
        'primary-hover': '#a60b26',
        'background-light': '#f8f6f6',
        'background-dark': '#221013',
        'sidebar-dark': '#181112',
        'sidebar-border': '#2a1e1f',
        'ibero-red': '#C41E3A',
        'ibero-dark-red': '#8B0000',
      },
      fontFamily: {
        'display': ['Public Sans', 'sans-serif'],
        'sans': ['Public Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
