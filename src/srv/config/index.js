'use strict'

/**
 * Configuration loader.
 */
class Config {
  constructor () {
    this.config = require('./config.json')
  }

  isDev () {
    return this.config.env === 'development'
  }

  getHttp () {
    return this.config.http
  }
}

exports.Config = Config
