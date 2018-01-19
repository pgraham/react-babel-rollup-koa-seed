/*
 * Copy source files from src/ to build/work/.
 */
'use strict'

const { promisify } = require('util')
const cp = promisify(require('fs').copyFile)
const ncp = promisify(require('ncp'))

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
    .catch((err) => {
      console.error('Unable to copy sources into work/ directory')
      reject(err)
    })
  })
}
