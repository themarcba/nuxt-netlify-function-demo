require('dotenv').config()

const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY,
})

const prepareFaunaFB = async () => {
  return await client.query(
    q.CreateIndex({
      name: 'claps_by_id',
      source: q.Collection('claps'),
      terms: [{ field: ['data', 'id'] }],
    })
  )
}

const createClap = async (data) => {
  try {
    const response = await client.query(
      q.Create(q.Collection('claps'), { data })
    )
    return response ? response.data : null
  } catch (error) {
    return null
  }
}

const updateClap = async (clap) => {
  console.log('update', clap)
  try {
    const response = await client.query(
      q.Update(q.Ref(q.Collection('claps'), clap.ref), {
        data: { claps: clap.claps + 1 },
      })
    )
    console.log(response)
    return response ? response.data : null
  } catch (error) {
    return null
  }
}

const getClap = async (id) => {
  try {
    const response = await client.query(
      q.Get(q.Match(q.Index('claps_by_id'), id))
    )
    return response
      ? { ...response.data, ref: response.ref.id.toString() }
      : null
  } catch (error) {
    return null
  }
}

module.exports = { prepareFaunaFB, createClap, getClap, updateClap }
