/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#ffeef8',
        'pastel-blue': '#e8f4ff',
        'primary-pink': '#ff6b9d',
        'primary-blue': '#5a8dee',
        'pastel-yellow': '#fff4a3',
      },
    },
  },
  plugins: [],
}

