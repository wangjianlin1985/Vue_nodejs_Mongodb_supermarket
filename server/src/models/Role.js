const mongoose = require('mongoose')
const Power = require('./Power')
const Schema = mongoose.Schema

const roleSchema = new Schema({
  role_name: { type: String },
  role_desc: { type: String },
  powerchildren: { type: Schema.Types.ObjectId, ref: 'Powerone' }
})

const Role = mongoose.model('Role', roleSchema)
module.exports = Role