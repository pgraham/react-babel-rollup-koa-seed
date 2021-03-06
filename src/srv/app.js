'use strict'

const path = require('path')
const http = require('http')
const Koa = require('koa')
const koaStatic = require('koa-static')

/**
 * Koa app wrapper.
 */
class App {
  constructor (config) {
    this.config = config
    this.app = new Koa()
    this.server = http.createServer(this.app.callback())

    if (config.isDev()) {
      require('./util/reload-server').init(this.server)
    }

    this.initMiddleware()
  }

  initMiddleware () {
    this.app.use(koaStatic(path.resolve(__dirname, '../web')))

    // Add other middleware here ...
  }

  addMiddleware (mw) {
    this.app.use(mw)
  }

  start () {
    let port = this.config.getHttp().port

    this.server.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }
}

exports.App = App
