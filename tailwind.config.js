/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        "custom-pink": "#F2BBB7",
        "custom-blue": "#4EC5CA",
      },
    },
  },
  plugins: [],
};
