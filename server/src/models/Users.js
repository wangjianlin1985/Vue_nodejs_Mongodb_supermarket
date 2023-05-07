const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  tel: { type: String, required: true },
  gender: { type: Number, enum: [0, 1], default: 0 },
  role: { type: String },
  status: { type: Boolean },
  avatar: { type: String },
  date: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
module.exports = User
