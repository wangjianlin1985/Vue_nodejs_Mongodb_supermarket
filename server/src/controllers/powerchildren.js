const Powertwo = require('../models/Powertwo')
const Powerthree = require('../models/Powerthree')
const Powerone = require('../models/Powerone')


// 级别三
function addpwthree(req, res) {
  const body = req.body
  Powerthree.findOne({
    pw_name: body.pw_name
  }, (err, succ) => {
    if (err) { return res.json('error') }
    if (succ) { return res.json('invalid')}
    new Powerthree(body).save((err, powerthree) => {
      if (err) { return res.json('error1') }
      if (!powerthree) { return res.json('invalid1')}
      res.json({
        powerthree
      })
    })
  })
}

function querypwthree(req, res) {
  Powerthree.find((err, data) => {
    if (err) { return res.json('error') }
    if (!data) { return res.json('invalid') }
    res.json({
      data
    })
  })
}

// 级别二
function addpwtwo(req, res) {
  const body = req.body
  console.log(body);
  
  Powertwo.findOne({
    pw_name: body.pw_name
  }, (err, succ) => {
    if (err) { return res.json('error') }
    if (succ) { return res.json('invalid') }
    new Powertwo(body).save((err, powertwo) => {
      if (err) { return res.json('error1') }
      if (!powertwo) { return res.json('invalid1.')}
      res.json({
        powertwo
      })
    })
  })
}
function querypwtwo(req, res) {
  Powertwo.find()
          .populate('powerchildren')
          .exec((err, data) => {
            if (err) { return res.json('error')}
            if (!data) { return res.json('invalid')}
            res.json({
              data
            })
          })
}

// 级别一
function addpwone(req, res) {
  const body = req.body
  Powerone.findOne({
    pw_name: body.pw_name
  }, (err, succ) => {
    if (err) { return res.json('error') }
    if (succ) { return res.json('invalid') }
    new Powerone(body).save((err, data) => {
      if (err) { return res.json('error1') }
      if (!data) { return res.json('invalid1')}
      res.json({
        data
      })
    })
  })
}
function querypwone(req, res) {
  Powerone.find()
          .populate('powerchildren')
          .exec((err, data) => {
            if (err) { return res.json('error') }
            if (!data) { return res.json('invalid') }
            res.json({
              data
            })
          })
}
module.exports = {
  addpwthree,
  querypwthree,
  addpwtwo,
  querypwtwo,
  addpwone,
  querypwone
}