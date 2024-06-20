/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple': 'rgb(0, 5, 29)',
        'red':'#ff0000'
      },
    },
  },
  plugins: [],
}
