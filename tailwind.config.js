module.exports = {

  important: true,

  content: [
    './public/**/*.html',
    './src/**/*.vue',
  ],

  safelist: [
    // 'bg-jkblue',
  ],

  theme: {

    colors: {
      black: { DEFAULT: 'black' },
      gray: { DEFAULT: 'gray' },
      white: { DEFAULT: 'white' },
      active: { DEFAULT: 'var(--color-active)' },

      // add more here (also define the colors in main.scss)
      sand: { DEFAULT: 'var(--color-sand)' },

    },

    extend: {
      fontFamily: {
        sans: ['Source Serif Pro', 'serif'],
      },
    },

    screens: {
      sm: '440px',
    },

  },

};
