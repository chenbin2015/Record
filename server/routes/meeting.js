var express = require('express')
var router = express.Router()
import meetlingList from '../data/list.js'

/* GET users listing. */
router.get('/list', function(req, res, next) {
  setTimeout(() => {
    res.send({
      code: 0,
      msg: 'success',
      data: meetlingList
    })
  }, 1000)
})

/* GET users listing. */
router.get('/getDetail', function(req, res, next) {
  const {
    query: { id }
  } = req
  let data = meetlingList.filter(item => item.id === +id)
  if (data.length > 0) {
    data = data[0]
  } else {
    data = {}
  }
  res.send({
    code: 0,
    msg: 'success',
    data: data
  })
})

module.exports = router
