const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uploadSchema = new Schema({
  goods_pic: { type: String }
})

const Upload = mongoose.model('Upload', uploadSchema)
module.exports = Upload