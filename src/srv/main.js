'use strict'

const { App } = require('./app')
const { Config } = require('./config')

const config = new Config()
let app = new App(config)
app.start()

if (config.isDev()) {
  require('./util/reload-server').start(app)
}
