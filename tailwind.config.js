/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "retro",
      {
        mytheme: {
          "primary": "#a37572",
          "secondary": "#f6d860",
          "accent": "#ef9995",
          "neutral": "#bfb9ab",
          "base-100": "#141414",
        },
      },
    ],
  },
};
