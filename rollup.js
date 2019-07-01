/**
 * Rollup configuration.
 */
'use strict'

import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import sourcemaps from 'rollup-plugin-sourcemaps'

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

export default {
  input: 'src/web/js/main.js',
  output: {
    file: 'src/web/app.js',
    format: 'iife',
    name: 'projectSeed',
    sourcemap: !isProd
  },
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    resolve({
      browser: true,
      extensions: ['.js', '.json', '.jsx']
    }),
    cjs({
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createElement',
          'useContext',
          'useEffect',
          'useLayoutEffect',
          'useMemo',
          'useReducer',
          'useRef',
          'Children',
          'Component',
          'Fragment',
          'PropTypes',
          'PureComponent'
        ],
        'node_modules/react-dom/index.js': [
          'render',
          'unstable_batchedUpdates'
        ],
        'node_modules/react-is/index.js': [
          'isValidElementType',
          'isContextConsumer'
        ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    isProd && uglify(),
    !isProd && sourcemaps()
  ],
  watch: {
    chokidar: {
      usePolling: true
    }
  }
}
