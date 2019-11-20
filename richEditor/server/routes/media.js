var express = require('express')
var path = require('path')
var mime = require('mime-types')
var fs = require('fs')

var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const {
    query: { id }
  } = req
  const pathUrl = path.join(__dirname, '../public/media', id)
  const type = mime.lookup(pathUrl)
  var stats = fs.statSync(pathUrl)
  console.log('pathUrl:', pathUrl)
  var charset = mime.charsets.lookup(type)
  res.header('Accept-Ranges', 'bytes')
  res.header('Content-Transfer-Encoding', 'binary')
  res.header('Access-Control-Allow-Headers', 'Range')
  res.header(
    'Access-Control-Expose-Headers',
    'Accept-Ranges, Content-Encoding, Content-Length, Content-Range,duration'
  )

  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
  res.setHeader('duration', 74)
  res.sendFile(pathUrl)
})

router.get('/test', function (req, res, next) {
  const {
    query: { id }
  } = req
  const pathUrl = path.join(__dirname, '../public/media', id)
  const type = mime.lookup(pathUrl)
  var stats = fs.statSync(pathUrl)
  console.log('pathUrl2:', stats)
  var charset = mime.charsets.lookup(type)
  res.header('Accept-Ranges', 'bytes')
  res.header('Content-Transfer-Encoding', 'binary')
  res.header('Access-Control-Allow-Headers', 'Range')

  res.header(
    'Access-Control-Expose-Headers',
    'Accept-Ranges, Content-Encoding, Content-Length, Content-Range, duration'
  )

  // res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
  res.setHeader('Content-Type', 'audio/wav')
  res.setHeader('duration', '3000000')
  res.sendFile(pathUrl)
})

module.exports = router
