const uniqid = require('uniqid')
const greetings = [
  'hello',
  'hi',
  'salutations',
  'greetings',
  'welcome',
  'ahoy',
  'ello there, mate',
  'hola',
  'yo',
]

const getRandomGreeting = () => {
  const n = Math.floor(Math.random() * greetings.length)
  return greetings[n]
}

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      at: new Date(),
      uid: uniqid(),
      greeting: getRandomGreeting(),
    }),
  }
}
