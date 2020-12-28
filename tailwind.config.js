const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
  purge: {
    mode: 'all',
    content: [
      './index.html',
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.svelte',
      './src/**/*.ts',
      './src/**/*.tsx',
      './src/**/*.vue',
    ],
  },
  theme: {
    screens: {
      xs: '420px',
      ...defaultConfig.theme.screens,
    },
  },
}
