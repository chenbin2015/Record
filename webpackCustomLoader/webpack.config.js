var webpack = require('webpack')
var path = require('path')
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path:path.resolve('./dest')
  },
  module: {
    rules: [{
        test: /\.(txt)$/,
        use: [{
          loader: path.resolve('./loader/changeNameLoader.js'),
          options: {
            name: 'test name'
          }
        }],
        include: path.resolve('./src')
      }
    ]
  }
}