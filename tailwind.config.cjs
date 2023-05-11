/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      teal: "#2b6777",
      "dim-blue": "#c8d8e4",
      "dark-grey": "#f2f2f2",
      "aqua-marine": "#52ab98",
      "white": "#ffffff", 
      "ship-gray": {
        50: "#f7f7f8",
        100: "#efedf1",
        200: "#dad7e0",
        300: "#bab4c5",
        400: "#938ba5",
        500: "#776d8a",
        600: "#605871",
        700: "#4f485c",
        800: "#443e4e",
        900: "#3c3744",
      },
      "orange": {
        500:"#f59e0b"
      }
    },
    screens: {
      xsm: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {},
  },
  plugins: [],
};
