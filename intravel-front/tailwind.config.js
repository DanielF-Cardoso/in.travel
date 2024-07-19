/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      },
      boxShadow: {
        'shape': '0px 8px 8px rgba(3, 7, 18, 0.1), 0px 4px 4px rgba(3, 7, 18, 0.1), 0px 2px 2px rgba(3, 7, 18, 0.1), 0px 0px 0px 1px rgba(3, 7, 18, 0.1)',
      },
      backgroundImage: {
        pattern: 'url("bg.png")',
      }
    },
  },
  plugins: [],
}