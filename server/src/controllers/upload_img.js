const Upload = require('../models/upload_img')
const formidable = require('formidable')
const configPath = require('../../config')
const { basename } = require('path')
const baseUrl = 'http://127.0.0.1:3000/public/upload_img/'


function upload(req, res, next) {
  const form = new formidable({ multiples: true })
  form.uploadDir = configPath.upload_img
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) return
    const body = fields
    body.goods_pic = baseUrl + basename(files.goods_pic.path)
    new Upload(body).save((err, succ) => {
      if (err) return
      if (!succ) return
      res.json({
        err_code: 0,
        message: 'Upload success.',
        data: succ
      })
    })
  })
}


module.exports = upload