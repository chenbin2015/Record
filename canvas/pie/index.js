/*
option={
	id:id,
	radius:100,
	textPosition:20,
	data:[
		{
	    ratio:2,
	    color:'red',
	    title:'中国'
		},
		{
	    ratio:3,
	    color:'green',
	    title:'日本'
		},
		{
	    ratio:2,
	    color:'gray',
	    title:'韩国'
		},
		{
	    ratio:3,
	    color:'orange',
	    title:'朝鲜'
		}
	]
}
*/
var Pie = function(option) {
  base.call(this,option)
  this.option = option || {}
  if (!this._checkValue()) {
    throw Error('ratio must euqal to 100')
  }
  this.canvas = document.querySelector('#' + this.option.id)
  this.width = this.canvas.width
  this.height = this.canvas.height
  this.draw()
}

// 画圆弧
Pie.prototype.draw = function() {
  const { data, radius } = this.option
  var ctx = this.canvas.getContext('2d')
  ctx.translate(this.width / 2, this.height / 2)
  ctx.font="20px Arial"
  for (let i = 0; i < data.length; i++) {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    this._getAngel(i)
    this._getTextCoordinate(i)
    ctx.fillStyle = data[i].color
    ctx.arc(0, 0, radius, data[i].angle.start, data[i].angle.end)
    if (this._isRight(i)) {
      ctx.textAlign = 'right'
    } else {
    	ctx.textAlign ='left'
    }
    ctx.fillText(data[i].title+'('+data[i].ratio+'%)', data[i].textPosition.x, data[i].textPosition.y)
    ctx.fill()
  }

}

// 获取角度，开始角和结束角
Pie.prototype._getAngel = function(index) {
  const { data } = this.option
  var angles = {
    start: 0,
    end: 0
  }
  for (var i = 0; i < index; i++) {
    angles.start += data[i].ratio
  }
  angles.end = angles.start + data[i].ratio
  angles.start /= 100
  angles.end /= 100
  angles.start = angles.start * 360 * Math.PI / 180
  angles.end = angles.end * 360 * Math.PI / 180
  data[index].angle = angles
}

// 检查value的值，加起来是否等于100
Pie.prototype._checkValue = function() {
  let { data } = this.option
  var sum = 0
  for (var i = 0; i < data.length; i++) {
    sum += data[i].ratio
  }
  return sum == 100
}

// 获取扇区中心绘制文本的坐标
Pie.prototype._getTextCoordinate = function(index) {
  let { data, textPosition, radius } = this.option
  var angle = data[index].angle.end - (data[index].angle.end - data[index].angle.start) / 2

  let x = Math.cos(angle) * (textPosition + radius)
  let y = Math.sin(angle) * (textPosition + radius)
  data[index].textPosition = {
    x,
    y
  }
}
// 判断当前的文本是否在圆的右边，因为右边的话，需要将文字右对齐，不然显示会有问题
Pie.prototype._isRight = function(index) {
  const { data } = this.option
  var middleAngle = (data[index].angle.start + data[index].angle.end) / 2
  middleAngle /= Math.PI
  return middleAngle >.5 && middleAngle < 1.5
}