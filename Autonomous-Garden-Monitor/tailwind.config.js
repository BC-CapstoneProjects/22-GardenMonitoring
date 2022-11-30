/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,css}",
  ],

  daisyui: {
    themes: [
      {
        autogarden: {
          "primary": "#39ddef",
          "secondary": "#ffa89b",
          "accent": "#d483e2",
          "neutral": "#30223F",
          "base-100": "#FCFCFD",
          "info": "#A4DAE5",
          "success": "#38E5B4",
          "warning": "#925C0C",
          "error": "#DC324C",
        },
      },
    ],
  },

  plugins: [
    require("daisyui")
  ],
}
