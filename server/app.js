const express = require('express')
const mongoose = require('mongoose')
const pathConfig = require('./config')
const bodyParser = require('body-parser')
const router = require('./router')
const session = require('express-session')

const app = express()
// 链接数据库
mongoose.connect(pathConfig.mongooseURL, {useNewUrlParser:true})
        .then(() => { console.log('db connected')})
        .catch(err => console.log(err))

// 开放public目录
app.use('/public/', express.static(pathConfig.publicPath))

// 配置bodyParser中间件，可以方便使用req.body
app.use(bodyParser.urlencoded( { extended: false } ))
app.use(bodyParser.json())



// 挂载用户session
app.use(session({
  secret: 'dag',
  resave: false,
  saveUninitialized: true
}))

// 挂载路由
app.use(router.userRouter)

// 运行服务器，监听3000端口
app.listen(3000,() => {
  console.log('app is running at port 3000')
})