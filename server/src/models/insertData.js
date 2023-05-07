/** 
 * 这里将放置假数据用于插入
*/
var ObjectId = require('mongodb').ObjectID;
//教师数据一条
exports.order={
    order_id: "20200826001",
    uname: "路飞",
    price: 12,
    order_status: 0,
    note: "快点发货",
    user_address: "成都红星路10号",
    order_list: [ObjectId("5f461911a8f07d4bf014d497"),ObjectId("5f461b68a8f07d4bf014d49b")],
    num_list: [2,3]
}

