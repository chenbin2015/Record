module.exports = {
  devtool: 'inline-source-map',
  entry: './demo.js',
  output: {
    filename: 'index.js',
    path: './dist'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  }
}