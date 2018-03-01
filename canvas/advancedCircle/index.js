var Circle = function(option) {
  option = option || {}
  if (!option.id) {
    throw Error('A canvas selector must exit')
  }
    if (!option.value) {
    throw Error('The value must exit')
  }
  this.canvas = document.querySelector(option.id)
  this.ctx = this.canvas.getContext('2d')
  this.percentage = option.value
  this.step = option.step || .05 
  this.percentageWidth = option.lineWidth || 20
  this.endArc = Math.PI * 2 * this.percentage / 100 - Math.PI / 2
  this.currentArc = -Math.PI / 2
  this.intervalObj = null
  this.fontSize = 20
  this.times = (this.endArc - this.currentArc) / this.step
  this.beginColor = option.beginColor || '#008000'
  this.endColor = option.endColor || '#ff0000'
  this.bgColor = option.bgColor || '#00FFFF'
  this.gradientColor = new gradientColor(this.beginColor, this.endColor, this.times)
  this.index = -1
  this.init()
}
Circle.prototype.init = function() {
  this.setSize()
  this.drawBaseCircle()
  this.drawCurrentProgress()
}
Circle.prototype.setSize = function() {
  this.canvas.width = this.canvas.offsetWidth * 2
  this.canvas.height = this.canvas.offsetHeight * 2
  // 重设之后再计算文字的大小
  this.fontSize = this.canvas.height / 5
}
Circle.prototype.drawBaseCircle = function() {
  this.ctx.lineWidth = this.percentageWidth / 2
  this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.height / 2 - this.percentageWidth / 2, 0, Math.PI * 2)
  this.ctx.strokeStyle = this.bgColor
  this.ctx.stroke()
}
Circle.prototype.drawCurrentProgress = function() {
  // 开启一段新路径
  this.ctx.beginPath()
  // 设置当前的圆弧的颜色
  this.ctx.strokeStyle = this.gradientColor[++this.index]
  // 设置圆弧的宽度，其实可以全局设置，没拿出去
  this.ctx.lineWidth = this.percentageWidth
  // 记住圆弧开始的弧度
  var startArc = this.currentArc
  // 算出圆弧结束的角度
  this.currentArc += this.step
  // 0.05的偏移量，不加的话没有完全盖住上一个弧，看起来有间隔
  // 画文字
  this.drawText((this.currentArc + Math.PI / 2) / (Math.PI * 2))
  // 如果当前结束的弧度大于最后结束的弧度，那么取消动画，并且画出最后的这段弧度
  // 否则继续画下一条弧度
  var self = this
  if (this.currentArc >= this.endArc) {
    cancelAnimationFrame(self.intervalObj)
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.height / 2 - this.percentageWidth / 2, startArc, this.endArc)
    this.ctx.stroke()
    return
  } else {
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.canvas.height / 2 - this.percentageWidth / 2, startArc.toFixed(2) - 0.05, this.currentArc.toFixed(2))
    this.ctx.stroke()
  }
  // 做动画
  this.intervalObj = requestAnimationFrame(this.drawCurrentProgress.bind(this))
}
Circle.prototype.drawText = function(text) {
  // 把文字转换为整数
  text = Math.floor((text * 100))
  // 设置字体，其实可以全局设置，没拿出去
  this.ctx.font = `${this.fontSize}px serif`
  // 获取文字的宽度，这里加上了百分号
  var textWidth = this.ctx.measureText(text + '%').width
  // 清除文字，注意这里是根据文字的宽度和文字的大小来计算的，
  // 宽度乘上1.1是为了将擦除区域变得比文字区域大一点
  this.ctx.clearRect(this.canvas.width / 2 - textWidth / 2, this.canvas.height / 2 - this.fontSize, textWidth * 1.1, this.fontSize * 2)
  //设置文本的垂直对齐方式
  this.ctx.textBaseline = 'middle'
  //设置文本的水平对齐方式
  this.ctx.textAlign = 'center'
  // 填充文字
  this.ctx.fillText(text + '%', this.canvas.width / 2, this.canvas.height / 2)
}

 /*
 	// 作者 yanue
 	// 参数：
 	// startColor：开始颜色hex
 	// endColor：结束颜色hex
     // step:几个阶级（几步）
    */
 function gradientColor(startColor, endColor, step) {
   startRGB = this.colorRgb(startColor); //转换为rgb数组模式
   startR = startRGB[0];
   startG = startRGB[1];
   startB = startRGB[2];

   endRGB = this.colorRgb(endColor);
   endR = endRGB[0];
   endG = endRGB[1];
   endB = endRGB[2];

   sR = (endR - startR) / step; //总差值
   sG = (endG - startG) / step;
   sB = (endB - startB) / step;

   var colorArr = [];
   for (var i = 0; i < step; i++) {
     //计算每一步的hex值 
     var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
     colorArr.push(hex);
   }
   return colorArr;
 }

 // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
 gradientColor.prototype.colorRgb = function(sColor) {
   var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
   var sColor = sColor.toLowerCase();
   if (sColor && reg.test(sColor)) {
     if (sColor.length === 4) {
       var sColorNew = "#";
       for (var i = 1; i < 4; i += 1) {
         sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
       }
       sColor = sColorNew;
     }
     //处理六位的颜色值
     var sColorChange = [];
     for (var i = 1; i < 7; i += 2) {
       sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
     }
     return sColorChange;
   } else {
     return sColor;
   }
 };

 // 将rgb表示方式转换为hex表示方式
 gradientColor.prototype.colorHex = function(rgb) {
   var _this = rgb;
   var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
   if (/^(rgb|RGB)/.test(_this)) {
     var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
     var strHex = "#";
     for (var i = 0; i < aColor.length; i++) {
       var hex = Number(aColor[i]).toString(16);
       hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
       if (hex === "0") {
         hex += hex;
       }
       strHex += hex;
     }
     if (strHex.length !== 7) {
       strHex = _this;
     }
     return strHex;
   } else if (reg.test(_this)) {
     var aNum = _this.replace(/#/, "").split("");
     if (aNum.length === 6) {
       return _this;
     } else if (aNum.length === 3) {
       var numHex = "#";
       for (var i = 0; i < aNum.length; i += 1) {
         numHex += (aNum[i] + aNum[i]);
       }
       return numHex;
     }
   } else {
     return _this;
   }
 }