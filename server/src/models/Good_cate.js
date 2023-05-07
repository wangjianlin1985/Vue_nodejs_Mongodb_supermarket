const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodsCateSchema = new Schema({
  cate_name: { type: String , required: true },
  cate_desc: { type: String, required: true },
  cate_level: { type: Number, default: 0 }
})

const Cate = mongoose.model('Cate', goodsCateSchema)

module.exports = Cate