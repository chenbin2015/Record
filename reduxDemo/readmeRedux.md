接着[上一篇](http://www.jianshu.com/p/5caab3e6bfb4)，来看看上一篇目录结构

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-0de2ce6922ea47e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

再来看看index.js,可以看到，只是引用了HelloWorld,虽然引用了reducers,但是并没有用到，所以上一篇仅仅是写了一个react的hello world，还没有redux的概念在里面
```
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import  reducers from './reducer'
import HelloWorld from './components/helloWorld'

const store = createStore(reducers,{text:'hello world'})
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <HelloWorld></HelloWorld>,
  rootEl
)

render()
```

本文将一步步介绍如何去添加redux，首先看看目录结构

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-9093732e39b29bb8.png?imageMogr2/auto-orient/strip%7CimageView2/2/h/300)

####1.actions，理解成actions创建函数
```
import { CHANGE_TEXT } from '../actionsType'

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}
```
定义了一个action,触发CHANGE_TEXT,并把形参text赋值给payload,比较简单

####2.actionsType，以常量定义action
```
export const CHANGE_TEXT = 'CHANGE_TEXT'
```
这个更简单，定义了一个action。当应用规模越来越大时，建议使用单独的模块或文件来存放 action

####3.components，展示组件库，里面包含了一个helloWorld组件
```
import React, { Component, PropTypes } from 'react';
// @pureRender
export default class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  componentWillReceiveProps(newProps){
  	console.log(newProps)
  }
  render() {
    return (
      <div>
		<button onClick={()=>{this.props.onClick(Math.random())}}>change Text</button>
			<div>{this.props.text}</div>
	  </div>
    )
  }
}

```
这是一个helloWorld组件，比较简单，从props中获取了一个onClick和text

####4.containers ，容器组件库

```
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as HelloWorldActions from '../actions/HelloWorld'
import HelloWorld from '../components/helloWorld'
// @pureRender
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    const { helloChan, helloWorldActons } = this.props
    return (
      <div>
      	<HelloWorld onClick={helloWorldActons.changeText} text=   {helloChan.text}></HelloWorld>
	  </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  helloWorldActons: bindActionCreators(HelloWorldActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

```

可以看见这个组件稍微有点复杂，其中用到了react-redux中的connect,react中的bindActionCreators，来看看定义
######connect
算了，还是不看定义了，比较难懂，可以理解成它是react和redux的连接器，而且它确实是。它接受两个参数mapStateToProps，mapDispatchToProps，前者指定如何把当前 Redux store state 映射到展示组件的 props 中，后者接收 [dispatch()
](http://cn.redux.js.org/docs/api/Store.html#dispatch) 方法并返回期望注入到展示组件的 props 中的回调方法。
看不懂是吧，实例讲解下
首先，mapStateToProps中的参数state就是在定义reducer时的state,这个一会儿再讲，首先看看state的结构
```
{ text: 'hello world',name:'default name',config:{name:'张三',sex:'男'} }
```
如果如下定义mapStateToProps
```
const mapStateToProps = state => state
```
那么在打印当前props时，得到的结果如下

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-c3abbdc3031420db.png?imageMogr2/auto-orient/strip%7CimageView2/2/h/200)

如果如下定义mapStateToProps
```
const mapStateToProps = state => {return {config:state.helloChan.config}}
```
再来看看结果是什么

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-e687bb2334e844f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/h/100)

看出区别了吗？其实还是回归到定义了，如何把当前 Redux store state 映射到展示组件的 props 中。

######bindActionCreators
再来看mapDispatchToProps，这个定义比较简单，将 action 作为 props 绑定到组件上，展开helloWorldActions,显然它已经将actions中的changeText绑定到了props上面

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-96dda8c78dab4b6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/h/200)'

此时，假如修改actions中的代码如下
```
import { CHANGE_TEXT } from '../actionsType'

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}

export function changeTextTest(text) {
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}
```
再看看截图

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-2d09dc219ace0d5b.png?imageMogr2/auto-orient/strip%7CimageView2/2/h/200)
很明显新增的changeTextTest已经自动绑定到props上

综上所述，其实connect可以理解成自动封装了如何将state和actions绑定到组件上的一套逻辑，这下应该明白了吧

####5.reducers
首先，reducer有一个拆分的概念，可以将许多的reducer拆分成不同的文件，再通过combineReducers这个方法来进行合并就行了，具体看一下代码

```
import { combineReducers } from 'redux'
import helloWorld from './helloWorld'
import student from './student'

const todoApp = combineReducers({
  helloChan:helloWorld,
  student
})

export default todoApp;
```
有helloworld和student两个reducer，可以通过combineReducers来合并，此时如果在connect中绑定state时直接这么写
```
const mapStateToProps = state => {
  return state
}
```
我们来看看结果：

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-0f4072ede1187155.png?imageMogr2/auto-orient/strip%7CimageView2/2/h/200)

看到了吧，多了student这个对象，其实一般情况下，一个container对应一个reducer，所以改改绑定的代码，如下
```
const mapStateToProps = state => {
  return { helloChan: state.helloChan }
}
```
再来看看结果,已经没有student了

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-b9d4f17cc181f3b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/h/200)

好了，本文就讲到这里，看完整个教程，应该比较清晰了。