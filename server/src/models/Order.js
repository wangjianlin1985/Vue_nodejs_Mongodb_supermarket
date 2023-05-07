const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  order_id: { type: String, required: true },
  uname: { type: String, required: true },
  price: { type: Number, required: true },
  order_status: { type: Number, enum: [0, 1], default: 0 },
  timer: { type: Date, default: Date.now },
  note: { type: String },
  user_address: { type: String, required: true },
  order_list: [{ type: Schema.Types.ObjectId, ref: 'Good' }],
  num_list: [{type: Number}]
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order