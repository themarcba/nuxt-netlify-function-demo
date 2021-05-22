const { getClap, createClap, updateClap } = require('../helpers/db')

const response = (data, statusCode = 200) => {
  console.log('🚚 <=', data)
  return { statusCode, body: JSON.stringify(data) }
}

// Helper functions to get the ID
const getPathId = (path) => path.split('/').pop()
const getBodyId = (body) => JSON.parse(body).id

// GET /api/claps/:id
const get = async (path) => {
  const id = getPathId(path)
  const clap = (await getClap(id)) || { id, count: 0 }
  return response(clap)
}

// POST /api/claps
const post = async (path, body) => {
  const id = getBodyId(body)
  let clap = await getClap(id)

  if (clap) clap = await updateClap(clap)
  else clap = await createClap(id)

  return response(clap)
}

const logRequest = (event) => {
  if (event.body) {
    console.log('👋 =>', event.httpMethod, event.path, event.body)
  } else {
    console.log('👋 =>', event.httpMethod, event.path)
  }
}

exports.handler = async (event, context) => {
  logRequest(event)
  if (event.httpMethod === 'GET') return get(event.path)
  else if (event.httpMethod === 'POST') return post(event.path, event.body)
}
