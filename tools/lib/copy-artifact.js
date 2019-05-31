/**
 * Copy a deployment artifact into the deployment directory structure.
 */
'use strict'

const { promisify } = require('util')
const fs = require('fs')
const copyFile = promisify(fs.copyFile)

module.exports = (artifactPath, deployArtifact) => {
  return new Promise((resolve, reject) => {
    copyFile(artifactPath, deployArtifact)
    .then(resolve)
    .catch(err => {
      console.log(`Unable to copy artifact`)
      reject(err)
    })
  })
}
