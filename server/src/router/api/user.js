const express = require('express')
const user = require('../../controllers/user')
const power = require('../../controllers/power')
const goods = require('../../controllers/good')
const upload = require('../../controllers/upload_img')
const cate = require('../../controllers/goods_cate')
const order = require('../../controllers/order')

const test = require('../../controllers/powerchildren')

const router = express.Router()


// 跨域
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  })


// 用户数据的增删改查路由
router
  .post('/api/login', user.login)
  .post('/api/createuser', user.createUser)
  .post('/api/queryuser', user.queryUser)
  .post('/api/queryuserbyid', user.queryById)
  .put('/api/modifyuser', user.modifyUser)
  .post('/api/deleteuser', user.deleteUser)

// 权限数据的增删改查路由
router
    .post('/api/createpower', power.createPower)
    .get('/api/querypower', power.queryPower)



// 测试powerchildren
router
    .post('/api/addpwthree', test.addpwthree)
    .get('/api/querypwthree', test.querypwthree)
    .post('/api/addpwtwo', test.addpwtwo)
    .get('/api/querypwtwo', test.querypwtwo)
    .post('/api/addpwone', test.addpwone)
    .get('/api/querypwone', test.querypwone)


// 商品增删改查路由
router
    .post('/api/addgoods', goods.addGoods)
    .post('/api/querybyid', goods.queryById)
    .post('/api/querygoods', goods.queryGoods)
    .put('/api/editgoods', goods.editGoodsById)
    .post('/api/deletegoods', goods.deleteGoodsById)

// 图片
router.post('/api/upload', upload)

// 商品一级列表
router
    .post('/api/addcate', cate.addCate)
    .post('/api/querycatebyid', cate.queryCateById)
    .post('/api/querycate', cate.queryCate)
    .put('/api/editcate', cate.editCateById)
    .post('/api/deletecate', cate.deleteCateById)

// 订单处理
router
    .post('/api/addorder', order.addOrder)
    .get('/api/queryorderall', order.queryOrderAll)
    .post('/api/queryorder', order.queryOrderByInfo)
    .post('/api/queryorderbyid', order.queryOrderById)
    .put('/api/editorder', order.editOrderById)
    .post('/api/deleteorder', order.deleteOrderById)


module.exports = router
