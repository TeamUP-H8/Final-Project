module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222222",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        128: "32rem",
      },
    },
    screens: {
      "2xs": "360px",
      xs: "420px",
      sm: "540px",
      md: "720px",
      lg: "920px",
      xl: "1040px",
    },
  },
  plugins: [require("daisyui")],
};
