/** 
 * 本文件专门用于插入数据库
 * 直接node运行本脚本
*/
//引入schema
const Order = require('./Order')
//引入假数据
const insertData = require('./insertData')
const data_order = insertData.order  //订单数据

console.log(data_order)
/** 
 * 插入订单数据
*/
const insertOrder = ()=>{
    
    Order.insertMany(data_order,(err,data)=>{
        console.log('finish')
        if(err) throw err;
        console.log(data)
    })
}

insertOrder()

//直接用navicat执行查询
/*
db.getCollection("orders").insert([ {
    order_id: "20200826003",
    uname: "王大强",
    price: 35,
    order_status: 0,
    note: "想吃啊",
    user_address: "成都红星路30号",
    order_list: [ObjectId("5f461911a8f07d4bf014d497"),ObjectId("5f467258ab509705f0a58656")],
    num_list: [2,4]
} ]);
*/




