const mongoose = require('mongoose')
const Schema = mongoose.Schema

const powerthreeSchema = new Schema({
  pw_name: { type: String },
  pw_level: { type: Number, default: 2 }
})

const Powerthree = mongoose.model('Powerthree', powerthreeSchema)
module.exports = Powerthree