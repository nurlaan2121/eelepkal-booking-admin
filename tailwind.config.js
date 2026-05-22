/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf5',
          100: '#c5d1e8',
          200: '#9fb3d9',
          300: '#7895ca',
          400: '#5a7ebe',
          500: '#0b2051',
          600: '#0a1b45',
          700: '#081538',
          800: '#06102b',
          900: '#040b1e',
        },
        accent: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#FF9800',
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 40px rgba(0, 0, 0, 0.15)',
        'primary': '0 8px 24px rgba(11, 32, 81, 0.35)',
      },
    },
  },
  plugins: [],
}
