/* eslint-env mocha */
'use strict'

import { expect } from 'chai'

import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import App from 'cmp/app'

describe('cmp/app', () => {
  it('instantiates', () => {
    let mockStore = {
      getState: () => ({ posts: [] })
    }
    let renderer = new ShallowRenderer()
    renderer.render(<App store={mockStore} />)

    const result = renderer.getRenderOutput()
    expect(result).to.exist()
  })
})
