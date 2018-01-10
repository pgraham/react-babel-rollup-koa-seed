'use strict'

const { App } = require('./app')
const { Config } = require('./config')

let app = new App(new Config())
app.start()
