/* eslint-env mocha */
'use strict'

import { expect } from 'chai'

import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { AppCmp } from 'cmp/app'

describe('cmp/app', () => {
  it('instantiates', () => {
    let renderer = new ShallowRenderer()
    renderer.render(<AppCmp posts={[]} />)

    const result = renderer.getRenderOutput()
    expect(result).to.exist()
  })
})
