const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Clap = mongoose.model('Clap', schema)

module.exports = Clap
