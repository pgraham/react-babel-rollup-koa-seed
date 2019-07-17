'use strict'

/**
 * Top level module for persisting the current state.
 */

export const APP_NAME = 'SEED_PROJECT'

export const DEFAULT_SAVE_SLOT = '__DEFAULT_SAVE_SLOT'

// export const saveState = state => {
// saveAppItem(DEFAULT_SAVE_SLOT, state)
// if (state && state.currentSlot) {
// saveAppItem(
// state.currentSlot,
// Object.keys(state)
// .filter(k => k !== state.currentSlot)
// .reduce((item, k) => {
// item[k] = state[k]
// return item
// }, {})
// )
// }
// }

// const saveAppItem = (slot, item) => saveItem(`${APP_NAME}:${slot}`, item)
// const saveItem = (slot, item) =>
// window.localStorage.setItem(slot, serialize(item))

// export const loadState = () => loadAppItem(DEFAULT_SAVE_SLOT)

// const loadAppItem = slot => loadItem(`${APP_NAME}:${slot}`)
// const loadItem = slot => deserialize(window.localStorage.getItem(slot))

export class LocalStorageAdapter {
  getItem (name) {
    return window.localStorage.getItem(name)
  }

  setItem (name, item) {
    return window.localStorage.setItem(name, item)
  }
}

export class Storage {
  constructor (adapter) {
    this.adapter = adapter || new LocalStorageAdapter()
  }

  getState () {
    return this.getAppItem(DEFAULT_SAVE_SLOT)
  }

  getAppItem (name) {
    return this.getItem(`${APP_NAME}:${name}`)
  }

  getItem (name) {
    return this.deserialize(this.adapter.getItem(name))
  }

  setState (state) {
    if (state && state.currentSlot) {
      this.setAppItem(
        state.currentSlot,
        Object.keys(state)
          .filter(k => k !== 'currentSlot')
          .reduce((items, k) => {
            items[k] = state[k]
            return items
          }, {})
      )
    }
    return this.setAppItem(DEFAULT_SAVE_SLOT, state)
  }

  setAppItem (name, item) {
    return this.setItem(`${APP_NAME}:${name}`, item)
  }

  setItem (name, item) {
    this.adapter.setItem(name, this.serialize(item))
  }

  serialize (value) {
    try {
      return JSON.stringify(value)
    } catch (e) {
      console.warn('Unable to serialize value', value)
      return undefined
    }
  }

  deserialize (value) {
    try {
      return JSON.parse(value)
    } catch (e) {
      console.warn('Unable to deserialize value', value)
      return undefined
    }
  }
}
