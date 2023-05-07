const Power = require('../models/Power')

// 添加权限
function createPower(req, res, next) {
  const body = req.body
  // 先查找是否存在该权限
  Power.findOne({
    pw_name: body.pw_name
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
        message: 'PW_name has already exists.'
      })
    }
    // 没有找到，说明可以添加该权限
    new Power(body).save((err, power) => {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Interval Invalid.'
        })
      }
      if (!power) {
        return res.status(200).json({
          err_code: 1,
          message: 'PW_name Invalid.'
        })
      }
      // 没有错误, 说明添加成功
      res.status(200).json({
        err_code: 0,
        message: 'Createpower Success.'
      })
    })
  })
}

// 查询权限
function queryPower(req, res, next) {
  Power.find((err, succ) => {
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
    // 查询到了
    res.status(200).json({
      err_code: 0,
      message: 'Query power success.',
      data: succ
    })
  })
}


module.exports = {
  createPower,
  queryPower
}