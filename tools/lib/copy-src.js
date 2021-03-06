/*
 * Copy source files from src/ to build/work/.
 */
'use strict'

const { promisify } = require('util')
const fs = require('fs')
const copyFile = promisify(fs.copyFile)
const access = promisify(fs.access)
const ncp = promisify(require('ncp'))

const cp = (src, dest) => {
  return access(src).then(
    () => {
      return copyFile(src, dest)
    },
    () => {}
  )
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      ncp('./src/srv', './build/work/srv'),
      cp('./src/web/index.html', './build/work/web/index.html'),
      cp('./src/web/styles.css', './build/work/web/styles.css'),
      cp('./src/web/app.js', './build/work/web/app.js'),
      ncp('./src/web/img', './build/work/web/img'),
      cp('./package.json', './build/work/package.json'),
      cp('./package-lock.json', './build/work/package-lock.json')
    ])
      .then(resolve)
      .catch(err => {
        console.error('Unable to copy sources into work/ directory')
        reject(err)
      })
  })
}
