const path = require('path')

module.exports = {
  mongooseURL: 'mongodb://localhost:27017/smile',
  publicPath: path.join(__dirname, './public/'),
  upload_img: path.join(__dirname, './public/upload_img')
}