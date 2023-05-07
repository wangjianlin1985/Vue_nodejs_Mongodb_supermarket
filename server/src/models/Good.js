const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodsSchema = new Schema({
  goods_name: { type: String, required: true },
  goods_cate: { type: String, required: true },
  goods_address: { type: String, required: true },
  now_price: { type: Number, required: true },
  old_price: { type: Number },
  inventory: { type: Number },
  sales: { type: Number },
  goods_size: { type: String },
  timer: { type: Date },
  goods_pic: { type: String }
})

const Good = mongoose.model('Good', goodsSchema)
module.exports = Good