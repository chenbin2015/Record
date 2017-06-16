require('babel-register')
require('babel-polyfill')

const Webpack_isomorphic_tools = require('webpack-isomorphic-tools')
const project_base_path = require('path').join(__dirname, '..')
console.log('project_base_path:............:', project_base_path)
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('../webpack/webpack-isomorphic-tools-configuration'))
  .server('./')
  .then(() => {
    require('./app');
  })