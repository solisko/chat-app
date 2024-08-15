/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro", "dracula", "cupcake"],
  },
};


// module.exports = {
//   //...
//   daisyui: {
//     themes: [
//       {
//         mytheme: {
//           "primary": "#a991f7",
//           "secondary": "#f6d860",
//           "accent": "#37cdbe",
//           "neutral": "#3d4451",
//           "base-100": "#ffffff",
//         },
//       },
//       "dark",
//       "cupcake",
//     ],
//   },
// }