/*
  var option = {
    id: 'c1',
    data: {
      value: 50,
      startColor: 'green',
      endColor: 'red',
      bgColor: 'gray',
      radius: 120
    }
  }
  new Circle(option)
*/
var Circle = function(option) {
  base.call(this, option)
  this.currentAngle = 0 // 每次要画的圆弧的终点值
  this.endAngle = option.data.value / 100 * Math.PI * 2
  this.step = Math.PI / 60
  this.startColor= option.data.startColor || 'red'
  this.endColor = option.data.endColor || 'red'
  this.bgColor = option.data.bgColor || '#000'
  this.radius = option.data.radius || 100
  this.drawBaseline()
  this.drawCurrentAngle()
}

// 画背景圆弧
Circle.prototype.drawBaseline = function() {
  const { ctx } = this
  ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
  ctx.strokeStyle = this.bgColor
  ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
  ctx.lineWidth = 5
  ctx.stroke()
  ctx.beginPath()
}

// 画当前的进度
Circle.prototype.drawCurrentAngle = function() {
  const { step, endAngle, ctx } = this
  if (this.currentAngle + step > endAngle) {
    this.currentAngle = endAngle
  } else {
    this.currentAngle += step
  }
  ctx.beginPath()
  ctx.arc(0, 0, this.radius, 0, this.currentAngle)
  ctx.lineCap = 'round'
  var lingrad = ctx.createLinearGradient(this.radius,0 , 0,0)
  lingrad.addColorStop(.25, this.startColor);
  lingrad.addColorStop(1, this.endColor);
  ctx.lineWidth = 20
  ctx.strokeStyle = lingrad
  ctx.stroke()
  ctx.beginPath()

  ctx.clearRect(-50, -50, 120, 100)
  ctx.font = '30px Arial'
  ctx.fillText(+(parseFloat(+this.currentAngle / (Math.PI * 2)) * 100).toPrecision(2) + '%', -30, 5)
  if (this.currentAngle >= endAngle) {
    currentProcess = 1
    this.currentAngle = endAngle
    return
  }
  requestAnimationFrame(() => {
    this.drawCurrentAngle()
  }, 100)
}
