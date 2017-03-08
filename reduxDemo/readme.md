备注：本demo采用es6语法，所以，会面临转码的问题，其次，转码之后，仅仅是转换成了es5的语法，比如依赖包使用require加载，所以会存在引用amd或者cmd库的问题，解决方案如下

######1.转码使用babel;

######2.模块化使用webpack解决。

###基本配置

####1.npm install

用于初始化package.json,本demo如下

``` 


{

"name": "redux-demo",

"version": "1.0.0",

"description": "This is a redux demo",

"main": "index.js",

"scripts": {

"test": "npm run start"

},

"repository": {

"type": "git",

"url": "git+https://github.com/chenbin2015/reduxDemo.git"

},

"keywords": [

"react",

"redux"

],

"author": "chenbin",

"license": "MIT",

"bugs": {

"url": "https://github.com/chenbin2015/reduxDemo/issues"

},

"homepage": "https://github.com/chenbin2015/reduxDemo#readme",

"dependencies": {

"react": "^15.4.2",

"react-dom": "^15.4.2",

"react-redux": "^5.0.3",

"redux": "^3.6.0"

},

"devDependencies": {

"babel": "^6.23.0",

"babel-cli": "^6.23.0",

"babel-core": "^6.7.6",

"babel-loader": "^6.2.4",

"babel-preset-es2015": "^6.6.0",

"babel-preset-react": "^6.5.0",

"babel-preset-stage-0": "^6.5.0",

"webpack": "^2.2.1"

}

}

```
####2.新增index.html，其中的js是经过babel转码，webpack打包之后的js
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="root"></div>
	<script type="text/javascript" src="./build/index.js"></script>
</body>
</html>
```

####3.新增index.js,这是整个项目的入口文件，代码如下
```
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import  reducers from '../reducer'

const store = createStore(reducers)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <div>Hello world</div>,
  rootEl
)

render()

```
其中的前三行都是基本的依赖，第四行是自己实现的reducers
####4.再来看看.babelrc的配置，如下
```
{
  "presets": ["es2015", "stage-0", "react"]
}
```
可以看到，这是一个json对象，且只有一个字段presets,它是用来设定转码规则的，代表的意思摘抄自阮老师的博文
```
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```
####5.接下来看看webpack的配置，最简单的配置，仅仅为了跑hello world
```
module.exports={
	entry:'./dist/index.js',
	output:{
		filename:'index.js',
		path:'./build'
	}
}
```
####6.结果如下，具体代码请猛戳[这里](https://github.com/chenbin2015)

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-32a6170043ef2b89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)