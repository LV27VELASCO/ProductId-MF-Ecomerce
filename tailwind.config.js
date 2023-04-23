module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'blue-beauty':"#2872FA",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
