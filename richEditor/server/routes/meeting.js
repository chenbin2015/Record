var express = require('express')
var router = express.Router()
import meetlingList from '../data/list.js'
import newList from '../data/newList.js'

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
  // if (data.info && data.info.length > 0) {
  //   data.authors = data.info.map(item => item.author)
  // }
  res.send({
    code: 0,
    msg: 'success',
    data: data
  })
})

router.get('/newlist', function(req, res, next) {
  setTimeout(() => {
    res.send({
      code: 0,
      msg: 'success',
      data: newList
    })
  }, 1000)
})
router.get('/getNewDetail', function(req, res, next) {
  const {
    query: { id }
  } = req
  let data = newList.filter(item => item.id === +id)

  if (data.length > 0) {
    data = data[0]
  } else {
    data = {}
  }
  data.authors = [
    {
      label: '钱仁平',
      id: '1'
    },
    {
      label: '秦文琛',
      id: '2'
    }
  ]
  // if (data.info && data.info.length > 0) {
  //   data.authors = data.info.map(item => item.author)
  // }
  res.send({
    code: 0,
    msg: 'success',
    data: data
  })
})

module.exports = router
