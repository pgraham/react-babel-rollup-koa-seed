/**
 * App startup. Bootstrap React.
 */
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './cmp/app'
import store from './model/store'

import autoreloader from './util/autoreload-client'

function render (state) {
  ReactDOM.render(
    React.createElement(Provider, { store }, [
      React.createElement(App, { key: 'app' })
    ]),
    document.getElementsByTagName('main')[0]
  )
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    render(store.getState())
  },
  false
)

if (process.env.NODE_ENV === 'development') {
  autoreloader.start()
}
