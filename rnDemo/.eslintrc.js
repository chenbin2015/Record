module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.react files
  plugins: [
    'react'
  ],
  // add your custom rules here
  'rules': {
    "eqeqeq": 0,
    "no-tabs": 0,
    "no-unreachable": 0,
    "eol-last": 0,  // 文件末尾强制换行
    "no-new": 0,  // 禁止在使用new构造一个实例后不赋值
    "quotes": 0,  // 引号类型 `` "" ''
    "no-unused-vars": [0, { "vars": "all", "args": "after-used" }],  // 不能有声明后未被使用的变量
    "no-trailing-spaces": 0,  // 一行结束后面不要有空格
    "space-before-function-paren": [0, "always"],  // 函数定义时括号前面要不要有空格
    'one-var': 0,  // 连续声明
    "no-undef": 0,  // 不能有未定义的变量
    "curly": [2, "all"],  // 必须使用 if(){} 中的{}
    'arrow-parens': 0,  // allow paren-less arrow functions
    'generator-star-spacing': 0,  // allow async-await
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-useless-constructor': 0
  }
}

