const { getClap, createClap, updateClap } = require('../helpers/db')

const response = (data, statusCode = 200) => {
  console.log('🚚 <=', data)
  return { statusCode, body: JSON.stringify(data) }
}

// Helper functions to get the ID
const getPathId = (path) => path.split('/').pop()
const getBody = (body) => JSON.parse(body)

// GET /api/claps/:id
const get = async (path) => {
  const id = getPathId(path)
  const clap = (await getClap(id)) || { id, count: 0 }
  return response(clap)
}

// POST /api/claps
const post = async (path, body) => {
  const { id, count } = getBody(body)
  console.log(body)
  if (count > 300) return response({ message: 'unauthorized' }, 400)

  let clap = await getClap(id)

  if (clap) clap = await updateClap(clap, count)
  else clap = await createClap(id, count)

  return response(clap)
}

const logRequest = (event) => {
  if (event.body) {
    console.log('👋 =>', event.httpMethod, event.path, event.body)
  } else {
    console.log('👋 =>', event.httpMethod, event.path)
  }
}

const isValidPOSTRequest = (event) => {
  return event.headers.referer === process.env.ALLOWED_REFERER
}

exports.handler = async (event, context) => {
  logRequest(event)

  if (event.httpMethod === 'GET') return get(event.path)
  else if (event.httpMethod === 'POST') {
    if (isValidPOSTRequest(event)) {
      return post(event.path, event.body)
    } else {
      return response({ message: 'unauthorized' }, 400)
    }
  }
}
