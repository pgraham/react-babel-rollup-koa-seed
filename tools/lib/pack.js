/**
 * Execute `npm pack` in build/work/ directory and move generated archive to
 * build/artifacts/ directory.
 */
'use strict'
const { join } = require('path')
const { spawn } = require('child_process')
const { promisify } = require('util')
const cp = promisify(require('fs').copyFile)

module.exports = (name, version, targetEnv) => {
  return new Promise((resolve, reject) => {
    const workDir = join(process.cwd(), 'build', 'work')
    const npm = spawn('npm', [ 'pack' ], {
      cwd: workDir
    })

    let errData = []
    npm.stderr.on('data', (data) => {
      errData.push(data)
    })

    npm.on('close', (code) => {
      if (code !== 0) {
        console.error(`Unable to execute npm pack in ${workDir}`)
        reject(new Error([ 'npm pack failed' ].concat(errData).join('\n')))
        return
      }

      let artifactName = `${name}-${version}.tgz`
      cp(
        `build/work/${artifactName}`,
        `build/artifacts/${targetEnv}/${artifactName}`
      )
      .then(() => {
        resolve(artifactName)
      })
      .catch((err) => {
        console.error(`Unable to copy artifact ${artifactName}`)
        reject(err)
      })
    })
  })
}
