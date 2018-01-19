/**
 * Rollup configuration.
 */
'use strict'

import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV || 'development'

export default {
  input: 'src/web/js/main.js',
  output: {
    file: 'src/web/app.js',
    format: 'iife',
    sourcemap: env === 'development'
  },
  plugins: [
    resolve({
      browser: true,
      extensions: [ '.js', '.json', '.jsx' ]
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    cjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    env === 'production' && uglify()
  ],
  watch: {
    chokidar: {
      usePolling: true
    }
  }
}
