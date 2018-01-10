'use strict';

/**
 *  Configuration loader.
 */
class Config {

  constructor () {
    this.env = require('./config.json')
  }

  getHttp () {
    return this.env.http
  }
}

exports.Config = Config
