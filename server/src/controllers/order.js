const Good = require('../models/Good')
const Order = require('../models/Order')

// 增加订单
function addOrder(req, res, next) {
  const body = req.body
  Order.findOne({
    order_id: body.order_id
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
        message: 'Order_id is Invalid.'
      })
    }
    new Order(body).save((err, data) => {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Interval Error.'
        })
      }
      if (!data) {
        return res.status(200).json({
          err_code: 1,
          message: 'Add Error.'
        })
      }
      res.status(200).json({
        err_code: 0,
        message: 'Add Success.',
        data: data
      })
    })
  })
}

// 查询所有订单
function queryOrderAll(req, res, next) {
  Order.find()
      .populate('order_list')
      .exec((err, data) => {
        if (err) return
        if (!data) return
        res.json({
          data
        })
      })
}

// 模糊查询和分页查询
function queryOrderByInfo(req, res, next) {
  const body = req.body
  const pagenum = parseInt(body.pagenum, 10) || 1
  const pagesize = parseInt(body.pagesize, 10) || 5
  const query = body.query || ''
  if (query) {
    const reg = new RegExp(query, 'i')
    Order.find({order_id: {$regex: reg}})
       .populate('order_list')
       .skip((pagenum - 1) * pagesize)
       .limit(pagesize)
       .exec((err, data) => {
         if (err) {
           return res.status(500).json({
             err_code: 500,
             message: 'Interval Error.'
           })
         }
         if (!data) {
           return res.status(200).json({
             err_code: 1,
             message: 'Order Invalid.'
           })
         }
         Order.find().count((err, ret) => {
           if (err) return
           if (!ret) return
           res.status(200).json({
             err_code: 0,
             message: 'Query Success.',
             data: data,
             total: ret
           })
         })
       })
  } else {
    Order.find()
         .populate('order_list')
         .skip((pagenum - 1) * pagesize)
         .limit(pagesize)
         .exec((err, data) => {
           if (err) {
             return res.status(500).json({
               err_code: 500,
               message: 'Interval Error.'
             })
           }
           if (!data) {
             return res.status(200).json({
               err_code: 1,
               message: 'Query Invalid.'
             })
           }
           Order.find().count((err, ret) => {
             if (err) return
             if (!ret) return
             res.status(200).json({
               err_code: 0,
               message: 'Query Success.',
               data: data,
               total: ret
             })
           })
         })
  }
}

// 根据id查询订单
function queryOrderById(req, res, next) {
  const id = req.body.id
  Order.findById(id, (err, succ) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: 'Interval Error.'
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
      message: 'Querry Success.',
      data: succ
    })
  })
}

// 修改订单
function editOrderById(req, res, next) {
  const id = req.body._id
  Order.findByIdAndUpdate(id, {
    order_id: req.body.order_id,
    uname: req.body.uname,
    price: req.body.price,
    order_status: req.body.order_status,
    user_address: req.body.user_address
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
        message: 'Order updated Failed.'
      })
    }
    res.status(200).json({
      err_code: 0,
      message: 'Order updated Success.'
    })
  })
}

// 删除订单
function deleteOrderById(req, res, next) {
  const id = req.body.id
  Order.findByIdAndRemove(id, (err, succ) => {
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
  addOrder,
  queryOrderAll,
  queryOrderByInfo,
  queryOrderById,
  editOrderById,
  deleteOrderById
}