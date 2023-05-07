const mongoose = require('mongoose')
const Schema = mongoose.Schema

const poweroneSchema = new Schema({
  pw_name: { type: String },
  pw_level: { type: Number, default: 0 },
  powerchildren: [{ type: Schema.Types.ObjectId , ref: 'Powertwo'}]
})

const Powerone = mongoose.model('Powerone', poweroneSchema)
module.exports = Powerone