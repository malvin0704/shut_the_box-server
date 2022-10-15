const mongoose = require('mongoose')
let Schema = mongoose.Schema
let playerRule = new Schema({
  username: {
    required: true,
    unique: true,
    type: Schema.Types.Mixed,
  },
  password: {
    required: true,
    type: Schema.Types.Mixed,
  },
  score: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})
module.exports = mongoose.model('players', playerRule)
