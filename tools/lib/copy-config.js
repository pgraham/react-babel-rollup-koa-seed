/**
 * Utility function to copy the specified configuration file to
 * build/work/src/srv/config/config.json
 */
'use strict'
const { promisify } = require('util')
const cp = promisify(require('fs').copyFile)

module.exports = (targetEnv) => {
  return new Promise((resolve, reject) => {
    cp(`./tools/env/${targetEnv}.json`, './build/work/srv/config/config.json')
    .then(resolve)
    .catch((err) => {
      console.error(`Unable to copy ${targetEnv} config`)
      reject(err)
    })
  })
}
