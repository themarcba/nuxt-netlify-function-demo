const mongoose = require('mongoose')
const { green, blue, red } = require('chalk')

const mongooseUrl = process.env.MONGODB_URL
console.log(blue(`· Connecting to MongoDB ...`))

mongoose.Promise = global.Promise

const connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(mongooseUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      console.log(green('✓ Successfully connected to MongoDB'))
      resolve()
    } catch (error) {
      console.log(red('✗ Could not connect to MongoDB'))
      reject()
    }
  })
}

module.exports = connect
