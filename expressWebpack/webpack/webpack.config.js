import webpack from 'webpack'

export default {
  entry: [
    './src/index.js',
    'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    filename: 'index.js',
    path: '/dist',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: [
        'style-loader', 'css-loader'
      ]
    }]
  }
}
