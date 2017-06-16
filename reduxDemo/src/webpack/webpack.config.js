var webpack = require('webpack')
var path = require('path')
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const webpack_isomorphic_tools_plugin =
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration')).development()


module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: ['babel-loader']
    }, {
      test: /\.scss$/,
      loader: [
        'style-loader',
        'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]_[hash:base64:5]',
        'sass-loader?sourceMap'
      ].join('!')
    },  {
      test: webpack_isomorphic_tools_plugin.regular_expression('images'),
      loader: 'url-loader?limit=10240'
    }]
  },
  plugins: [
    webpack_isomorphic_tools_plugin,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
