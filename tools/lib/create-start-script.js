/**
 * Write the forever start script to the specified deployment directory.
 */
'use strict'

const { promisify } = require('util')
const fs = require('fs')
const writeFile = promisify(fs.writeFile)

module.exports = (deployPath, name, targetEnv) => {
  const START_SCRIPT = `#!/usr/bin/env bash
LOG_DIR=$HOME/dev/srv/${name}/${targetEnv}/logs
NODE_PATH=. forever start --uid "${name}_${targetEnv}" -a \\
  -l $LOG_DIR/forever.log \\
  -o $LOG_DIR/out.log \\
  -e $LOG_DIR/err.log \\
  srv/main.js`

  return new Promise((resolve, reject) => {
    writeFile(`${deployPath}/start.sh`, START_SCRIPT, {
      mode: 0o777
    })
    .then(resolve)
    .catch(err => {
      console.log(`Unable to create start script`)
      reject(err)
    })
  })
}
