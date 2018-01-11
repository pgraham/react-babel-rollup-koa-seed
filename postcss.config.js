/**
 * Postcss configuration.
 */
module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: ctx.options.parser,
  plugins: {
    'postcss-import': { root: 'src/web/css' },
    'postcss-cssnext': {}
  }
})
