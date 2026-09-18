/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          sidebar: '#051816',
          sidebarCard: '#081f1c',
          darkCard: '#091e1c',
          emerald: '#059669',
          emeraldHover: '#047857',
          teal: '#0d9488',
          accent: '#10b981',
          lightBg: '#f8fafc',
          cardBorder: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
