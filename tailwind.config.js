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
          "primary": "#8b5654",
          "secondary": "#0f766e",
          "accent": "#fcd34d",
          "neutral": "#ffedd5",
          "base-100": "#44403c",
          "info": "#4338ca",
          "success": "#15803d",
          "warning": "#ea580c",
          "error": "#b91c1c",
        },
      },
    ],
  },
};
