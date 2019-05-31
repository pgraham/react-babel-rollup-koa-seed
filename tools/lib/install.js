/**
 * Execute `npm install --only=production` in specified deployment directory.
 */
'use strict'

const { spawn } = require('child_process')

module.exports = (deployPath) => {
  return new Promise((resolve, reject) => {
    const npm = spawn('npm', [ 'install', '--only=production' ], {
      cwd: deployPath
    })

    let errData = []
    npm.stderr.on('data', data => {
      errData.push(data)
    })

    npm.on('close', code => {
      if (code !== 0) {
        console.log(`Unable to install NPM dependencies`)
        return reject(new Error([ 'npm install failed:' ].concat(errData).join('\n')))
      }

      resolve()
    })
  })
}
