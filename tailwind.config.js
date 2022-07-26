/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#5ccba3',
          secondary: '#FFFFFF',
          accent: '#def5eb',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#52c41a',
          warning: '#FBBD23',
          error: '#F87272',
          link: '#2170c1',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
