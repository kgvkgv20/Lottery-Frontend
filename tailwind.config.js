const { secondary } = require("daisyui/src/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: "#3F72AF",
      secondary: "#F0F0F3",
      topic: "#112D4E",
      white: "base-100",
      black: "#252525",
      green: "#25AE7A",
      red: "#FF2400"
    },
    extend: {
      fontFamily: {
        sans: "'Kanit', sans-serif",
        serif: "'Kanit', sans-serif",
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(to bottom, #f0f0f3, #cbcee2, #a3add1)',
      },

    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3F72AF",
          secondary: "#F0F0F3",
        },
      },
    ],
  },
  plugins: [require("daisyui"),],
}
