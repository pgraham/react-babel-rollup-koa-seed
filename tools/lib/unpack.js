/**
 * Unpack deployed artifact.
 */
'use strict'

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const { promisify } = require('util')

const rename = promisify(fs.rename)

module.exports = (artifactPath) => {
  return new Promise((resolve, reject) => {
    const artifactName = path.basename(artifactPath)
    const artifactDir = path.dirname(artifactPath)
    const deployName = path.basename(artifactPath, '.tgz')

    const tar = spawn('tar', [ '-xzf', artifactName ], {
      cwd: artifactDir
    })

    let errData = []
    tar.stderr.on('data', data => {
      errData.push(data)
    })

    tar.on('close', code => {
      if (code !== 0) {
        console.log(`Unable to expand archive ${artifactPath}`)
        return reject(new Error([ 'tar expansion failed:' ].concat(errData).join('\n')))
      }

      rename(`${artifactDir}/package`, `${artifactDir}/${deployName}`)
      .then(resolve)
      .catch(err => {
        console.log(`Unable to rename expanded archive`)
        reject(err)
      })
    })
  })
}
