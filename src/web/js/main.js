/**
 * App startup. Bootstrap React.
 */
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { App } from './cmp/app'
import { initializeStore } from './model/store'
import { Storage } from './persistence/storage'

import autoreloader from './util/autoreload-client'

const storage = new Storage()

const store = initializeStore(storage.getState())

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

store.subscribe(render)
store.subscribe(() => storage.setState(store.getState()))

if (process.env.NODE_ENV === 'development') {
  autoreloader.start()
}
