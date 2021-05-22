const mongooseConnect = require('../db/mongoose.connect')
const Clap = require('../db/models/Clap.model')
mongooseConnect()

const response = (data, statusCode = 200) => {
  console.log('🚚 <=', data)
  return { statusCode, body: JSON.stringify(data) }
}

// Helper functions to get the ID
const getPathName = path => path.split('/').pop()
const getBody = body => JSON.parse(body)

// GET /api/claps/:id
const get = async path => {
  const name = getPathName(path)
  const clap = await Clap.findOne({ name })
  console.log(clap)
  return response(clap)
}

// POST /api/claps
const post = async (path, body) => {
  const { name, count } = getBody(body)
  if (count > 30) return response({ message: 'unauthorized' }, 400)
  let clap = await Clap.findOne({ name })
  if (clap) clap.count += count
  else clap = new Clap({ name, count })
  await clap.save()
  return response(clap)
}

const logRequest = event => {
  if (event.body) {
    console.log(
      `👋 (${event.headers['client-ip']}) =>`,
      event.httpMethod,
      event.path,
      event.body
    )
  } else {
    console.log(
      `👋 (${event.headers['client-ip']}) =>`,
      event.httpMethod,
      event.path
    )
  }
}

const isValidPOSTRequest = event => {
  const isRefererValid = event.headers.referer === process.env.ALLOWED_REFERER
  const isClientIPValid = !process.env.BLOCKED_IPS.split(',').includes(
    event.headers['client-ip']
  )
  return isRefererValid && isClientIPValid
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
