const { prepareFaunaFB } = require('../db/db')

const run = async () => {
  console.log('Preparing FaunaDB...')
  await prepareFaunaFB()
  console.log('Done.')
}

run()
