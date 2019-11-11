const path = require('path')
const fs = require('fs')
const express = require('express')
const sendRanges = require('send-ranges')
const app = express()

const mp3Path = path.join(__dirname, '../public/media')
var router = express.Router()

router.get('/', (req, res) => {
  const {
    query: { id }
  } = req
  try {
    const pathUrl = path.join(__dirname, '../public/media', id)
    const stat = fs.statSync(pathUrl)
    const total = stat.size

    fs.exists(pathUrl, exists => {
      if (exists) {
        console.log('req.headers:', req.headers.Range)
        const range = req.headers.range
        const parts = range.replace(/bytes=/, '').split('-')
        const partialStart = parts[0]
        const partialEnd = parts[1]

        const start = parseInt(partialStart, 10)
        const end = partialEnd ? parseInt(partialEnd, 10) : total - 1
        const chunksize = end - start + 1
        const rstream = fs.createReadStream(pathUrl, { start: start, end: end })
        var fileBuffer = Buffer.from(pathUrl)
        console.log('pathUrl:', pathUrl)
        console.log('ddddddddddddddd:', fileBuffer.length)
        res.writeHead(206, {
          'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'audio/mpeg'
        })
        rstream.pipe(res)
      } else {
        res.send('Error - 404')
        res.end()
        // res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
        // fs.createReadStream(path).pipe(res);
      }
    })
  } catch (e) {
    console.error('错误', e.message)
  }
})

module.exports = router
