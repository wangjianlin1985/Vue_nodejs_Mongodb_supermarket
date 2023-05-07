const Good = require('../models/Good')
const formidable = require('formidable')
const configPath = require('../../config')
const { basename } = require('path')
const baseURL = 'http://192.168.1.6:3000/public/upload_img/'
// 添加商品
// function addGoods(req, res, next) {
//   const form = new formidable({ multiples: true })
//   // 配置上传路径
//   form.uploadDir = configPath.upload_img
//   // 保留文件上传后缀名
//   form.keepExtensions = true
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({
//         err_code: 500,
//         message: 'Interval Error.'
//       })
//     }
//     body = fields
//     Good.findOne({
//       goods_name: body.goods_name
//     }, (err, succ) => {
//       if (err) {
//         return res.status(500).json({
//           err_code: 500,
//           message: 'Interval Error.'
//         })
//       }
//       if (succ) {
//         return res.status(200).json({
//           err_code: 1,
//           message: 'Goods_name has already exists.'
//         })
//       }
//       // body.goods_pic = `${configPath.upload_img}` + '\\' +  `${basename(files.goods_pic.path)}`
//       body.goods_pic = baseURL + basename(files.goods_pic.path)
//       const good = new Good({
//         goods_name: body.goods_name,
//         goods_cate: body.goods_cate,
//         goods_address: body.goods_address,
//         now_price: body.now_price,
//         old_price: body.old_price,
//         inventory: body.inventory,
//         sales: body.sales,
//         goods_size: body.goods_size,
//         goods_pic: body.goods_pic,
//         timer: body.timer
//       })
//       good.save((err, data) => {
//         if (err) {
//           return res.status(500).json({
//             err_code: 500,
//             message: 'Internal Error.'
//           })
//         }
//         if (!data) {
//           return res.status(200).json({
//             err_code: 1,
//             message: 'Good Invalid.'
//           })
//         }
//         res.status(200).json({
//           err_code: 0,
//           message: 'Add good success.',
//           data: data
//         })
//       })
//     })
//   })
// }

// 添加商品
function addGoods(req, res, next) {
  const body = req.body
  Good.findOne({
    goods_name: body.goods_name
  }, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Interval Error.'
      })
    }
    if (succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'Goods_name Invalid.'
      })
    }
    new Good(body).save((err, data) => {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Interval Error.'
        })
      }
      if (!data) {
        return res.status(200).json({
          err_code: 1,
          message: 'Add Goods Failed.'
        })
      }
      res.status(200).json({
        err_code: 0,
        message: 'Add Goods Success.'
      })
    })
  })
}

// 根据id查找商品
function queryById(req, res, next) {
  const id = req.body.id
  Good.findById(id, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Interval Error.'
      })
    }
    if (!succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'ID Invalid.'
      })
    }
    res.status(200).json({
      err_code: 0,
      data: succ
    })
  })
}

// 根据条件查询所有商品
function queryGoods(req, res, next) {
  const body = req.body
  const pagenum = parseInt(body.pagenum, 10) || 1
  const pagesize = parseInt(body.pagesize, 10) || 7
  const query = body.query || ''
  // 参数验证
  if (query) {
    const reg = new RegExp(query, 'i')
    Good.find({goods_name: {$regex: reg}})
        .skip((pagenum - 1) * pagesize)
        .limit(pagesize)
        .exec((err, succ) => {
          if (err) {
            return res.status(500).json({
              err_code: 500,
              message: 'Interval Error.'
            })
          }
          if (!succ) {
            return res.status(200).json({
              err_code: 1,
              message: 'Query Invalid.'
            })
          }
          Good.find().count((err, ret) => {
            if (err) return
            if (!ret) return
            res.status(200).json({
              err_code: 0,
              message: 'Query Success.',
              data: succ,
              total: ret
            })
          })
        })
  } else {
    // 没有参数
    Good.find()
    .skip((pagenum - 1) * pagesize)
    .limit(pagesize)
    .exec((err, succ) => {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Interval Error.'
        })
      }
      if (!succ) {
        return res.status(200).json({
          err_code: 1,
          message: 'Query Invalid.'
        })
      }
      Good.find().count((err, ret) => {
        if (err) {return false}
        if (!ret) {return false}
        res.status(200).json({
          err_code: 0,
          message: 'Quert Success.',
          data: succ,
          total: ret
        })
      })
    })
  }
}

// 根据id修改商品信息
// function editGoodsById(req, res, next) {
//   const form = new formidable({multiples: true})
//   form.uploadDir = configPath.upload_img
//   form.keepExtensions = true
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({
//         err_code: 500,
//         message: 'Interval Error.'
//       })
//     }
//     body = fields
//     // body.goods_pic = `${configPath.upload_img}` + '\\' +  `${basename(files.goods_pic.path)}`
//     body.goods_pic = baseURL + basename(files.goods_pic.path)
//     console.log(body);
    
//     Good.findByIdAndUpdate(body.id, {
//       goods_name: body.goods_name,
//       goods_cate: body.goods_cate,
//       goods_address: body.goods_address,
//       now_price: body.now_price,
//       old_price: body.old_price,
//       inventory: body.inventory,
//       sales: body.sales,
//       goods_size: body.goods_size,
//       goods_pic: body.goods_pic,
//       timer: body.timer
//     }, (err, succ) => {
//       if (err) {
//         return res.status(500).json({
//           err_code: 500,
//           message: 'Interval Error.'
//         })
//       }
//       if (!succ) {
//         return res.status(200).json({
//           err_code: 1,
//           message: 'Updated Failed.'
//         })
//       }
//       console.log(succ);
      
//       res.status(200).json({
//         err_code: 0,
//         message: 'Updated Success.',
//         data: succ
//       })
//     })
//   })
// }

// 根据id修改商品
function editGoodsById(req, res, next) {
  const body = req.body
  Good.findByIdAndUpdate(body._id,{
    goods_name: body.goods_name,
    goods_cate: body.goods_cate,
    goods_address: body.goods_address,
    now_price: body.now_price,
    old_price: body.old_price,
    inventory: body.inventory,
    sales: body.sales,
    goods_size: body.goods_size,
    goods_pic: body.goods_pic
  }, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Interval Error.'
      })
    }
    if (!succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'Edit Goods Invalid.'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'Edit Goods Success.'
    })
  })
}

// 根据id删除商品
function deleteGoodsById(req, res, next) {
  const id = req.body.id
  Good.findByIdAndRemove(id, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Interval Error.'
      })
    }
    if (!succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'Delete Failed.'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'Delete Success.'
    })
  })
}

module.exports = {
  addGoods,
  queryById,
  queryGoods,
  editGoodsById,
  deleteGoodsById
}
