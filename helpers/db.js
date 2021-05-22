require('dotenv').config()

const faunadb = require('faunadb')
const q = faunadb.query
const { Collection, Create, Get, Update, Ref, Match, Index } = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET_KEY })

const prepareFaunaFB = async () => {
  try {
    await client.query(
      q.CreateIndex({
        name: 'claps_by_id',
        source: q.Collection('claps'),
        terms: [{ field: ['data', 'id'] }],
      })
    )
  } catch (error) {
    throw new Error('DB preparation failed.', error.message)
  }
}

const getClap = async (id) => {
  try {
    const response = await client.query(Get(Match(Index('claps_by_id'), id)))
    return { ...response.data, ref: response.ref.id.toString() }
  } catch (error) {
    return null
  }
}

const createClap = async (id) => {
  const data = { id, count: 1 }
  try {
    const response = await client.query(Create(Collection('claps'), { data }))
    return response.data
  } catch (error) {
    return null
  }
}

const updateClap = async (clap) => {
  try {
    const response = await client.query(
      Update(Ref(Collection('claps'), clap.ref), {
        data: { count: clap.count + 1 },
      })
    )
    return response.data
  } catch (error) {
    return null
  }
}

module.exports = { prepareFaunaFB, createClap, getClap, updateClap }
