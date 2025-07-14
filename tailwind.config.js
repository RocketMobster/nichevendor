/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316", // Soft orange as specified in the docs
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
