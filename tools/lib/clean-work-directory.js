/**
 * Utility script to clean the build/work/ directory.
 */
'use strict'
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const mkdirp = promisify(require('mkdirp'))

const BUILD_DIR = './build'
const WORK_DIR = `${BUILD_DIR}/work`
const ARTIFACT_DIR = `${BUILD_DIR}/artifacts`

module.exports = (targetEnv) => {
  return new Promise((resolve, reject) => {
    rimraf(WORK_DIR)
    .then(() => {
      Promise.all([
        mkdirp(`${WORK_DIR}/web`),
        mkdirp(`${ARTIFACT_DIR}/${targetEnv}`)
      ])
      .then(resolve)
      .catch((err) => {
        console.error('Unable to create work directory structure')
        reject(err)
      })
    })
    .catch((err) => {
      console.error('Unable to remove build/work')
      reject(err)
    })
  })
}
