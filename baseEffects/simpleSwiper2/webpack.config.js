module.exports = {
  entry: './demo.js',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      loader: [
        'style',
        'css?modules&importLoaders=2&sourceMap&localIdentName=[local]_[hash:base64:5]',
        'postcss',
        'sass?sourceMap'
      ].join('!')
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }]
  }
}
