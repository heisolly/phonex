/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        dark: {
          900: '#0a0a14',
          800: '#12121f',
          700: '#1a1a2e',
          600: '#1f1f35',
        },
        whatsapp: '#25D366',
        neon: {
          green: '#10b981',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
        },
        accent: {
          cyan: '#06b6d4',
          magenta: '#a855f7',
          yellow: '#f59e0b',
        }
      },
    },
  },
  plugins: [],
}
