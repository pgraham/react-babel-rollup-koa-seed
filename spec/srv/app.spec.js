/* eslint-env mocha */
'use strict'
const { expect } = require('chai')

const { App } = require('app')
const { Config } = require('config')

describe('app', () => {
  it('loads config', () => {
    let app = new App(new Config())
    expect(app.config).to.exist()
  })
})
