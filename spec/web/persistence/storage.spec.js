/* eslint-env mocha */
'use strict'

import { expect } from 'chai'
import sinon from 'sinon'

import { APP_NAME, DEFAULT_SAVE_SLOT, Storage } from 'persistence/storage'

const aKey = 'an-item'
const aValue = { value: 'a value' }

describe('persistence/index', () => {
  let storage
  let adapter
  beforeEach(() => {
    adapter = {
      getItem: sinon.stub().returns(JSON.stringify(aValue)),
      setItem: sinon.spy()
    }
    storage = new Storage(adapter)
  })

  it('loads items from local storage', () => {
    expect(storage.getItem(aKey)).to.eql(aValue)
    expect(adapter.getItem).to.have.been.calledWith(aKey)
  })

  it('set items to local storage', () => {
    storage.setItem(aKey, aValue)
    expect(adapter.setItem).to.have.been.calledWith(
      aKey,
      JSON.stringify(aValue)
    )
  })

  it('sets items prefixed with app identifier', () => {
    storage.setAppItem(aKey, aValue)
    expect(adapter.setItem).to.have.been.calledWith(
      `${APP_NAME}:${aKey}`,
      JSON.stringify(aValue)
    )
  })

  it('gets items prefixed with app identifier', () => {
    expect(storage.getAppItem(aKey)).to.eql(aValue)
    expect(adapter.getItem).to.have.been.calledWith(`${APP_NAME}:${aKey}`)
  })

  it('saves app state', () => {
    storage.setState(aValue)
    expect(adapter.setItem).to.have.been.calledWith(
      `${APP_NAME}:${DEFAULT_SAVE_SLOT}`,
      JSON.stringify(aValue)
    )
  })

  it('loads app state', () => {
    expect(storage.getState()).to.eql(aValue)
    expect(adapter.getItem).to.have.been.calledWith(
      `${APP_NAME}:${DEFAULT_SAVE_SLOT}`
    )
  })

  it('saves into current slot if set', () => {
    storage.setState({ currentSlot: 'mySlot', values: aValue })
    expect(adapter.setItem).to.have.been.calledWith(
      `${APP_NAME}:${DEFAULT_SAVE_SLOT}`,
      JSON.stringify({ currentSlot: 'mySlot', values: aValue })
    )
    expect(adapter.setItem).to.have.been.calledWith(
      `${APP_NAME}:mySlot`,
      JSON.stringify({ values: aValue })
    )
  })
})
