const { getClap, createClap, updateClap } = require('../utils/clapHelpers')

const response = ({ data, statusCode = 200 }) => {
  console.log('<=', data)
  return { statusCode, body: JSON.stringify(data) }
}

exports.handler = async (event, context) => {
  if (event.body) console.log('=>', JSON.parse(event.body))
  if (event.httpMethod === 'GET') {
    const id = event.path.split('/').pop()
    const clap = await getClap(id)
    if (!clap) return response({ data: { id, claps: 0 }, statusCode: 200 })
    return response({ data: clap })
  } else if (event.httpMethod === 'POST') {
    const id = JSON.parse(event.body).id
    let clap = await getClap(id)

    if (clap) {
      console.log('update')
      // update claps
      clap = await updateClap(clap)
      return response({ data: clap })
    } else {
      // create claps
      console.log('create')
      clap = await createClap({ id, claps: 1 })
      return response({ data: clap })
    }
  }
}
