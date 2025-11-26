/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#7c5dff',
        secondary: '#22d3ee',
        dark: '#0c1021',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(0, 0, 0, 0.35)',
      },
      borderRadius: {
        xl: '18px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
