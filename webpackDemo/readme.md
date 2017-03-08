接着[上一篇](http://www.jianshu.com/p/a9b3705d4613),使用babel打包时对单个文件打包的问题，可能有其他解决方案，此处就不研究了，想使用webpack来解决的，请看此篇
####1.文件构成

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/5087999-afaeb79c7c6c25bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

demo.js ,可以看到，使用ES6的语法应用了helloWorld，并执行了方法

```
import helloWorld from './helloWorld.js'
helloWorld()
```
helloWorld.js,导出一个Test方法，在上一句中被重命名了

```
export default function Test(){
	console.log(123)
}
```
index.html,引用生成后的js

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
</head>
<body>
	<script type="text/javascript" src='./dist/index.js'></script>
</body>
</html>
```

package.json，定义了依赖的包，只有babel-loader,webpack
```
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "This is a webpack demo",
  "main": "demo.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "webpack"
  ],
  "author": "chenbin",
  "license": "MIT",
  "dependencies": {
    "babel-loader": "^6.4.0",
    "webpack": "^2.2.1"
  }
}
```
webpack.config.js,定义入口，出口，loader

```
module.exports={
	entry:'./demo.js',
	output:{
		filename:'index.js',
		path:'./dist'
	},
  module: {
     loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader'
	    }
	  ]
  }
}
```
重点看package.json和webpack.config.js,可以看见只引用了两个依赖，并且只使用了一个loader即可完成