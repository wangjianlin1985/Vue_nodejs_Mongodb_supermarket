const mongoose = require('mongoose')
const Schema = mongoose.Schema

const powertwoSchema = new Schema({
  pw_name: { type: String },
  pw_level: { type: Number, default: 1 },
  powerchildren: [{ type: Schema.Types.ObjectId, ref: 'Powerthree'}]
})

const Powertwo = mongoose.model('Powertwo', powertwoSchema)
module.exports = Powertwo
