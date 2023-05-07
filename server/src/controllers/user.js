const User = require('../models/Users')

// 查询单个用户，用于校验登录时邮箱和密码是否正确
function login(req, res, next) {
  const body = req.body
  User.findOne({
    email: body.email,
    password: body.password
  }, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Internal Error.'
      })
    }
    if(!succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'Login Success.'
    })
  })
}

// 添加用户
function createUser(req, res, next) {
  // 获取表单数据
  const body = req.body
  // 查询用户是否存在
  User.findOne({
    email: body.email
  }, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Internal Error.'
      })
    }
    if (succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email has already exists.'
      })
    }
    // 没有查询到该邮箱，说明可以注册
    new User(body).save((err, user) => {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal Error.'
        })
      }
      // 没有错误，说明注册成功
      req.session.user = user
      res.status(200).json({
        err_code: 0,
        message: 'Createuser Success.',
        data: req.session.user
      })
    })
  })

}

// 查询所有用户
function queryUser(req, res, next) {
  const body = req.body
  const pagenum = parseInt(body.pagenum, 10) || 1
  const pagesize = parseInt(body.pagesize) || 5
  const query = body.query || ''
  
  // 参数验证
  if (query) {
    const reg = new RegExp(query, 'i')
      User.find({name: {$regex: reg}})
        .skip((pagenum - 1) * pagesize)
        .limit(pagesize)
        .exec((err, succ) => {
          if (err) {
            return res.status(500).json({
              err_code: 500,
              message: 'Internal Error.'
            })
          }
          if (!succ) {
            return res.status(200).json({
              err_code: 1,
              message: 'Query Invalid.'
            })
          }
          // 查询成功
          User.find().count((err, ret) => {
            if (err) return
            if (!ret) return
            // 响应数据
            res.status(200).json({
              err_code: 0,
              data: succ,
              total: ret
            })
          })
        })
  } else {
    User.find()
      .skip((pagenum - 1) * pagesize)
      .limit(pagesize)
      .exec((err, succ) => {
        if (err) {
          return res.status(500).json({
            err_code: 500,
            message: 'Internal Error.'
          })
        }
        if (!succ) {
          return res.status(200).json({
            err_code: 1,
            message: 'Query Invalid.'
          })
        }
        User.find().count((err, ret) => {
          if (err) return 
          if (!ret) return 
          // 查询成功
          res.status(200).json({
            err_code: 0,
            message: 'Queryuser success',
            data: succ,
            total: ret
          })
        })
      })
  }
}

// 根据id查询单个用户
function queryById(req, res, next) {
  const id = req.body.id
  User.findById(id, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: "Internal Error."
      })
    }
    if (!succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'ID is Invalid.'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'Query Success.',
      data: succ
    })
  })
}

// 修改用户数据
function modifyUser(req, res, next) {
  const id = req.body._id
  User.findByIdAndUpdate(id, {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    tel: req.body.tel,
    gender: req.body.gender,
    role: req.body.role,
    status: req.body.status
  }, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Internal Error'
      })
    }
    if (!succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'Updated Error.'
      })
    }
    if (succ) {
      res.status(200).json({
        err_code: 0,
        message: 'Modifyuser success',
        data: succ
      })
    }
  })
}

// 删除用户
function deleteUser(req, res, next) {
  const id = req.body._id
  User.findByIdAndRemove(id,(err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Interval Error.'
      })
    }
    if (!succ) {
      return res.status(200).json({
        err_code: 1,
        message: 'Deleted Invalid.'
      })
    }
    if (succ) {
      res.status(200).json({
        err_code: 0,
        message: 'Deleteuser success.'
      })
    }
  })
}

module.exports = {
  login,
  createUser,
  queryUser,
  queryById,
  modifyUser,
  deleteUser,
  login
}