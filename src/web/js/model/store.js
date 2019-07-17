/**
 * Initialize Redux store.
 */
'use strict'

import { createStore } from 'redux'

function getDefaultState () {
  return {
    posts: [
      `HARI SELDON—… born in the 11,988th year of the Galactic Era; died 12,069.`,
      `The dates are more commonly given in terms of the Foundational Era as — 79 to the year 1 F.E.`,
      `Born to middle-class parents on Helicon, Arcturus sector (where his father, in a legend of doubtful authenticity, was a tobacoo grower in the hydroponic plants of the planet), he early showed amazing ability in mathematics.`,
      `Anecdotes concerning his ability are innumerable, and some are contradictory.`,
      `At the age of two, he is said to have …`
    ]
  }
}

export const initializeStore = (initialState = getDefaultState()) =>
  createStore((state = initialState, action) => {
    switch (action.type) {
      default:
        return state
    }
  })
