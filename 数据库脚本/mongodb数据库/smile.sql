/*
 Navicat Premium Data Transfer

 Source Server         : localhost_27017
 Source Server Type    : MongoDB
 Source Server Version : 40201
 Source Host           : localhost:27017
 Source Schema         : smile

 Target Server Type    : MongoDB
 Target Server Version : 40201
 File Encoding         : 65001

 Date: 26/08/2020 18:26:22
*/


// ----------------------------
// Collection structure for cates
// ----------------------------
db.getCollection("cates").drop();
db.createCollection("cates");

// ----------------------------
// Documents of cates
// ----------------------------
db.getCollection("cates").insert([ {
    _id: ObjectId("5f461877a8f07d4bf014d494"),
    "cate_level": NumberInt("0"),
    "cate_name": "水果",
    "cate_desc": "富含维生素哦",
    __v: NumberInt("0")
} ]);
db.getCollection("cates").insert([ {
    _id: ObjectId("5f46188ea8f07d4bf014d495"),
    "cate_level": NumberInt("0"),
    "cate_name": "蔬菜",
    "cate_desc": "做饭菜不错哦",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for goods
// ----------------------------
db.getCollection("goods").drop();
db.createCollection("goods");

// ----------------------------
// Documents of goods
// ----------------------------
db.getCollection("goods").insert([ {
    _id: ObjectId("5f461911a8f07d4bf014d497"),
    "goods_name": "苹果",
    "goods_cate": "水果",
    "goods_address": "成都",
    "now_price": 3.5,
    "old_price": NumberInt("5"),
    inventory: NumberInt("100"),
    sales: NumberInt("0"),
    "goods_size": "500g",
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_74674060c83a73246282f3834b93527f.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("5f461a91a8f07d4bf014d499"),
    "goods_name": "雪梨",
    "goods_cate": "水果",
    "goods_address": "洛阳",
    "now_price": NumberInt("2"),
    "old_price": NumberInt("3"),
    inventory: NumberInt("200"),
    sales: NumberInt("20"),
    "goods_size": "1000g",
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_ac510ca05638ef7b1bbbe9328be4e307.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("5f461b68a8f07d4bf014d49b"),
    "goods_name": "空心菜",
    "goods_cate": "蔬菜",
    "goods_address": "成都",
    "now_price": 1.5,
    "old_price": 2.8,
    inventory: NumberInt("80"),
    sales: NumberInt("10"),
    "goods_size": "500g",
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_3481961367f54d755559b3abced1d3b3.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("5f461bcba8f07d4bf014d49d"),
    "goods_name": "樱桃",
    "goods_cate": "水果",
    "goods_address": "乐山",
    "now_price": 4.5,
    "old_price": 6.8,
    inventory: NumberInt("90"),
    sales: NumberInt("25"),
    "goods_size": "500g",
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_09e5cf8ad2d24c82beb966bc2fac2ba4.jpg",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for orders
// ----------------------------
db.getCollection("orders").drop();
db.createCollection("orders");

// ----------------------------
// Documents of orders
// ----------------------------
db.getCollection("orders").insert([ {
    _id: ObjectId("5f4628d70078e72904005983"),
    "order_id": "20200826001",
    uname: "路飞",
    price: NumberInt("12"),
    "order_status": NumberInt("1"),
    note: "快点发货",
    "user_address": "成都红星路10号",
    "order_list": [
        ObjectId("5f461911a8f07d4bf014d497"),
        ObjectId("5f461b68a8f07d4bf014d49b")
    ],
    "num_list": [
        2,
        3
    ]
} ]);
db.getCollection("orders").insert([ {
    _id: ObjectId("5f4629ce0078e72904005984"),
    "order_id": "20200826002",
    uname: "王德强",
    price: 24,
    "order_status": 0,
    note: "想吃东西了",
    "user_address": "成都红星路20号",
    "order_list": [
        ObjectId("5f461911a8f07d4bf014d497"),
        ObjectId("5f461bcba8f07d4bf014d49d")
    ],
    "num_list": [
        3,
        1
    ]
} ]);

// ----------------------------
// Collection structure for uploads
// ----------------------------
db.getCollection("uploads").drop();
db.createCollection("uploads");

// ----------------------------
// Documents of uploads
// ----------------------------
db.getCollection("uploads").insert([ {
    _id: ObjectId("5f46190fa8f07d4bf014d496"),
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_74674060c83a73246282f3834b93527f.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("uploads").insert([ {
    _id: ObjectId("5f461a8fa8f07d4bf014d498"),
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_ac510ca05638ef7b1bbbe9328be4e307.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("uploads").insert([ {
    _id: ObjectId("5f461b67a8f07d4bf014d49a"),
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_3481961367f54d755559b3abced1d3b3.jpg",
    __v: NumberInt("0")
} ]);
db.getCollection("uploads").insert([ {
    _id: ObjectId("5f461bcaa8f07d4bf014d49c"),
    "goods_pic": "http://127.0.0.1:3000/public/upload_img/upload_09e5cf8ad2d24c82beb966bc2fac2ba4.jpg",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("5f45f75aa8f07d4bf014d493"),
    gender: NumberInt("0"),
    email: "254540457@qq.com",
    password: "123456",
    name: "汪大神",
    tel: "13508085123",
    date: ISODate("2020-08-26T05:47:06.121Z"),
    __v: NumberInt("0"),
    role: "主管",
    status: true
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5f462d86a8f07d4bf014d49e"),
    gender: NumberInt("1"),
    email: "xiaoli@126.com",
    password: "123456",
    name: "小丽",
    tel: "13551983123",
    date: ISODate("2020-08-26T09:38:14.825Z"),
    __v: NumberInt("0"),
    role: "测试角色",
    status: true
} ]);
