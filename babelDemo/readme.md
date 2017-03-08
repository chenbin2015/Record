####1.安装基本的依赖
``` 
npm i babel-cli babel-core babel-preset-es2015 babel-preset-stage-0
```
####2.创建.babelrc来定义编码规范
```
{
  "presets": ["es2015", "stage-0"]
}
```
####3.用ES6编写一个helloWorld.js,并且编写一个index.js来调用这个helloWorld.js
helloWorld.js
```
export default function Test(){
	console.log(123)
}
```
index.js

```
import index from './index.js'
console.log(index)
```
####4.使用babel来进行转码
```
babel index.js --out-dir ./build
```
####5.生成的代码
```
'use strict';
var _index = require('./index.js');
var _index2 = _interopRequireDefault(_index);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
console.log(_index2.default);
```
####6.结论
从生成的代码来看，里面还有require之类的，可以在node环境中执行看看效果，但是在执行的时候，helloWorld的代码并没有转换，直接报错了，所以，这只是用来转换单个文件使用的，建议还是采用webpack来进行转码，直接可以用在html中
注：有兴趣的同志可以试试转化以下代码
```
let arr=[1,2,3]
arr.map((ele)=>{
	console.log(ele)
})
```