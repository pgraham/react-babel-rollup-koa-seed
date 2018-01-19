/**
 * Execute `npm shrinkwrap` inside build/work/ directory.
 */
'use strict'
const { join } = require('path')
const { spawn } = require('child_process')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const workDir = join(process.cwd(), 'build', 'work')
    const npm = spawn('npm', [ 'shrinkwrap' ], {
      cwd: workDir
    })

    let errData = []
    npm.stderr.on('data', data => {
      errData.push(data)
    })

    npm.on('close', (code) => {
      if (code === 0) {
        return resolve()
      }

      console.error(`Unable to execute npm shrinkwrap in ${workDir}`)
      reject(new Error([ 'npm shrinkwrap failed:' ].concat(errData).join('\n')))
    })
  })
}
