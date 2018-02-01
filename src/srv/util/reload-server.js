'use strict'

const path = require('path')
const fs = require('fs')
const debounce = require('./debounce')

const { Server: WebSocketServer } = require('ws')

/**
 * Auto-reload websocket server
 */
exports.start = app => {
  const options = {
    server: app.server,
    path: '/autoreload'
  }

  const wss = new WebSocketServer(options)

  wss.on('connection', () => {
    console.log('Reload client connected')
  })

  const webRoot = path.resolve(__dirname, '../../../src/web')
  const watchPaths = [
    path.resolve(webRoot, 'index.html'),
    path.resolve(webRoot, 'app.js'),
    path.resolve(webRoot, 'styles.css')
  ]

  watchPaths.forEach(f => {
    let dispatchReload = debounce((evType, fName) => {
      console.log(`${fName} ${evType}`)

      wss.clients.forEach(client => {
        client.send('reload')
      })
    }, 100)
    fs.watch(f, dispatchReload)
  })
}
