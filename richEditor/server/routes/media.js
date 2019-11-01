var express = require('express')
var path = require('path')
var mime = require('mime-types')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  const {
    query: { id }
  } = req
  const pathUrl = path.join(__dirname, '../public/media', id)
  const type = mime.lookup(pathUrl)

  var charset = mime.charsets.lookup(type)
  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
  res.sendFile(pathUrl)
})

module.exports = router
