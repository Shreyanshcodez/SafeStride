/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070a13',
          900: '#0c1120',
          850: '#11172a',
          800: '#172036',
          700: '#222f4c',
          600: '#324368',
        },
        purple: {
          950: '#120726',
          900: '#1d0d3d',
          800: '#2d145c',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

