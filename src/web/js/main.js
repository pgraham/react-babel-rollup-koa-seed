/**
 * App startup. Bootstrap React.
 */
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './cmp/app'
import store from './model/store'

import autoreloader from './util/autoreload-client'

document.addEventListener(
  'DOMContentLoaded',
  () => {
    ReactDOM.render(
      React.createElement(App, { store: store }),
      document.getElementsByTagName('main')[0]
    )
  },
  false
)

if (process.env.NODE_ENV === 'development') {
  autoreloader.start()
}
