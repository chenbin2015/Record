require('babel-register')
require('babel-polyfill')

const Webpack_isomorphic_tools = require('webpack-isomorphic-tools')
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('../webpack/webpack-isomorphic-tools-configuration'))
  .server('./')
  .then(() => {
    require('./app');
  })