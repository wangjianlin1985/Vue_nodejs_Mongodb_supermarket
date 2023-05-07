const mongoose = require('mongoose')
const Schema = mongoose.Schema

const powerSchema = new Schema({
  pw_name: { type: String },
  pw_level: { type: Number, enum: [0, 1, 2], default: 0 }
})

const Power = mongoose.model('Power', powerSchema)
module.exports = Power