'use strict'

/**
 * Debounce event emission. Trailing events are invoked.
 */
module.exports = function (fn, wait) {
  let emitTimer

  return (...args) => {
    clearTimeout(emitTimer)
    emitTimer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}
