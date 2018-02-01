/* global WebSocket */
/**
 * Automatic page reload client. Listens for websocket to close and then reloads
 * the page when the socket is reopened.
 *
 * Based on the reload_client found in
 * (alallier/reload)[https://github.com/alallier/reload/blob/master/lib/reload-client.js]
 */

function getSocketUrl () {
  let socketUrl = window.location.origin.replace(/^http(s?)/, 'ws$1')

  return `${socketUrl}/autoreload`
}

function openConnection () {
  let socket = new WebSocket(getSocketUrl())

  socket.addEventListener('open', () => {
    console.log('Reload connection established')
  })

  socket.addEventListener('error', err => {
    console.error('Reload connection error:', err)
  })

  socket.addEventListener('close', () => {
    console.log('Reload connection closed, reestablishing')
    setTimeout(openConnection, 100)
  })

  return socket
}

/**
 * Start the autoreload client.
 */
exports.start = function () {
  let pageUnloaded = false
  window.addEventListener('beforeunload', () => {
    pageUnloaded = true
  })

  window.addEventListener('load', () => {
    let socket = openConnection()

    socket.addEventListener('message', msg => {
      console.log('Reload message received:', msg)
      if (msg.data === 'reload' && !pageUnloaded) {
        console.log('Reloading page')
        window.location.reload()
      }
    })
  })
}
