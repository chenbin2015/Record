function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom元素不存在');
    }
  },
  // 把当前dom下的元素全部放到临时的dom树中
  nodeToFragment: function(el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild
    }
    return fragment;
  },
  // 递归编译节点，本demo
  compileElement: function(el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function(node) {
      // 只处理dom节点，其他的忽略
      if (node.nodeType == 1) {
        self.compile(node);
      }
      // 如果还有子节点，则递归处理
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  },
  // 根据指令编译Element,有属性和事件，编译结束，删除指令（本示例只对绑定v-model指令进行处理）
  compile: function(node) {
    var attr = node.getAttribute('v-model');
    var self = this
    if (attr) {
      attr = /\{\{(.*)\}\}/.exec(attr)[1]
      var val = setValueByExp(self, attr)
      node.innerText = val
      new Watcher(vm, attr, function(value) {
        node.innerText = value || ''
      })
      node.removeAttribute('v-model')
    }
  }
}