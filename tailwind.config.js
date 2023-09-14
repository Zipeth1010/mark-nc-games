/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      orange: "#F66403",
      white: "#ffffff",
      black: "#000000",
      green: "#008000",
      red: "#ff0000",
    },
    extend: {
      aspectRatio: {
        "4/3": "4/3",
      },
    },
  },
  plugins: [],
};
