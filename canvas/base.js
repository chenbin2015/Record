var base = function(option) {
  if (Object.prototype.toString.call(option).toLowerCase() != '[object object]') {
    throw Error('option must be object')
  }
  if (!option.id) {
    throw Error('canvas id must be added')
  }
  if (!option.data) {
    throw Error('data must be added')
  }
   this.canvas = document.querySelector('#' + option.id)
   this.ctx = this.canvas.getContext('2d')
}