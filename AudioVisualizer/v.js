// 音频可视化
/* new Visualizer({
    url:'http://192.168.100.81:3000/media/?id=我和我追逐的梦.mp3'
})
*/
var Visualizer = function(options) {
  options = options || {}
  if (!options.url) {
    throw new Error('url cannot be null')
  }
  this.currentIndex = 0
  this.start = 0
  this.step = options.step || 1000000
  this.end = this.step
  this.contentLength = 0
  this.sourceList = []
  this.dataTimer = 2000
  this.url = options.url
  this.playing = false
  this._playInterval = null
  this.onTimeUpdate = options.onTimeUpdate
  this._init()
}
Visualizer.prototype = {
  // 初始化，开始定时获取数据，直至数据获取结束
  _init: async function() {
    this.getData()
  },
  // 定时获取数据，直至数据获取结束
  getData: async function() {
    // 请求头初始化，主要用来设置range
    const requestOptions = {
      method: 'GET',
      headers: {
        Range: `bytes=${this.start}-${this.end}` // 前100字节
      }
    }
    // fetch
    const res = await fetch(this.url, requestOptions)
    if (!res.ok) throw new Error(`${res.status} = ${res.statusText}`)
    // 获取arrayBuffer
    const buffer = await res.arrayBuffer()
    // 获取头，用来得到总的bytes
    const tempContentRange = res.headers.get('Content-Range')
    const total = tempContentRange.substring(
      tempContentRange.indexOf('/') + 1,
      tempContentRange.length
    )
    if (this.contentLength === 0) {
      this.contentLength = total
    }

    // 创建上下文
    const ctx = new AudioContext()
    // 转码 for mp3,注意调整step
    //const decodeBuffer = await ctx.decodeAudioData(buffer)
    // 转码，for wav,注意调整step
    const decodeBuffer = await ctx.decodeAudioData(
      withWaveHeader(buffer, 2, 44100)
    )
    // 控制音量中间件
    const gainNode = ctx.createGain()
    // 创建AudioBufferSourceNode ，就是一个音频源
    let source = ctx.createBufferSource()
    // 创建声音数据
    source.buffer = decodeBuffer
    // 连接音量控制
    source.connect(gainNode)
    // 连接扬声器
    gainNode.connect(ctx.destination)
    // 存储生源
    this.sourceList.push({
      buffer: decodeBuffer,
      ctx,
      source,
      gainNode
    })
    // 判断请求的文件bytes,是否大于了文件的bytes，如果未大于，则轮询查询文件的数据
    if (this.end < +this.contentLength) {
      this.start = this.end
      this.end += this.step
      setTimeout(this.getData.bind(this), this.dataTimer)
    }
    // to-do: 暂时未用
    // return decodeBuffer
  },
  // 播放
  play: function() {
    const that = this
    if (this.sourceList && this.sourceList.length > 0) {
      console.log('this.currentIndex:', this.currentIndex)
      // 获取当前的声源
      const currentSource = this.sourceList[this.currentIndex]
      // 开始播放生源
      currentSource.source.start(0)
      currentSource.ctx.currentTime = 0
      // 获取声源的时长
      const duration = currentSource.buffer.duration
      console.log('duration:', duration)
      // 当前声源播放结束，继续播放下一段
      currentSource.source.onended = function() {
        console.log('end')
        currentSource.source.stop(0)
        that.currentIndex++
        if (that.currentIndex <= that.sourceList.length) {
          that.play()
        }
      }
      //   currentSource.gainNode.gain.linearRampToValueAtTime(
      //     1,
      //     currentSource.ctx.currentTime + duration
      //   )
      //   currentSource.gainNode.gain.linearRampToValueAtTime(
      //     0,
      //     currentSource.ctx.currentTime + duration
      //   )
      // 模拟audio的timeupdate，可传入回调
      const timeUpdate = function() {
        const currentTime = currentSource.ctx.currentTime
        if (currentTime >= duration) {
          cancelAnimationFrame(that._playInterval)
        }
        that.onTimeUpdate && that.onTimeUpdate(currentTime)
        that._playInterval = requestAnimationFrame(timeUpdate)
      }
      timeUpdate()
    }
  },
  pause: function() {}
}

// 给wav文件添加头
function withWaveHeader(data, numberOfChannels, sampleRate) {
  const header = new ArrayBuffer(44)

  const d = new DataView(header)

  d.setUint8(0, 'R'.charCodeAt(0))
  d.setUint8(1, 'I'.charCodeAt(0))
  d.setUint8(2, 'F'.charCodeAt(0))
  d.setUint8(3, 'F'.charCodeAt(0))

  d.setUint32(4, data.byteLength / 2 + 44, true)

  d.setUint8(8, 'W'.charCodeAt(0))
  d.setUint8(9, 'A'.charCodeAt(0))
  d.setUint8(10, 'V'.charCodeAt(0))
  d.setUint8(11, 'E'.charCodeAt(0))
  d.setUint8(12, 'f'.charCodeAt(0))
  d.setUint8(13, 'm'.charCodeAt(0))
  d.setUint8(14, 't'.charCodeAt(0))
  d.setUint8(15, ' '.charCodeAt(0))

  d.setUint32(16, 16, true)
  d.setUint16(20, 1, true)
  d.setUint16(22, numberOfChannels, true)
  d.setUint32(24, sampleRate, true)
  d.setUint32(28, sampleRate * 1 * 2)
  d.setUint16(32, numberOfChannels * 2)
  d.setUint16(34, 16, true)

  d.setUint8(36, 'd'.charCodeAt(0))
  d.setUint8(37, 'a'.charCodeAt(0))
  d.setUint8(38, 't'.charCodeAt(0))
  d.setUint8(39, 'a'.charCodeAt(0))
  d.setUint32(40, data.byteLength, true)

  return concat(header, data)
}

function concat(buffer1, buffer2) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)

  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)

  return tmp.buffer
}
