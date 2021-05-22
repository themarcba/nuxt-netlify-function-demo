const { prepareFaunaFB } = require('../utils/clapHelpers')

const run = async () => {
  console.log('Preparing FaunaDB...')
  const response = await prepareFaunaFB()
  console.log(response)
}

run()
