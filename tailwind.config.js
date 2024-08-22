/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro", "synthwave"],
  },
};

// daisyui: {
//   themes: [
//     "retro",
//     {
//       mytheme: {
//         "primary": "#a37572",
//         "secondary": "#f6d860",
//         "accent": "#ef9995",
//         "neutral": "#bfb9ab",
//         "base-100": "#141414",
//       },
//     },
//   ],
// },
// };
// daisyui: {
//   themes: [
//     {
//       mytheme: {
        
// "primary": "#fcd34d",        
// "secondary": "#fb923c",        
// "accent": "#f43f5e",        
// "neutral": "#44403c",        
// "base-100": "#fef3c7",        
// "info": "#60a5fa",        
// "success": "#22c55e",        
// "warning": "#f9a8d4",        
// "error": "#b91c1c",        },
//       },
//     ],
//   },
