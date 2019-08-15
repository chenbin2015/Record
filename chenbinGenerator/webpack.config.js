const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  devServer: {
    // hot: true,
    inline: true,
    historyApiFallback: true // 开发模式，解决需要配置127.0.0.1 localhost的问题，主要是刷新404，生产模式，需要用nginx解决
    // contentBase: 'http://www.163.com'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7', 'iOS >= 8']
                  }
                }
              ],
              'react',
              'es2015',
              'stage-0'
            ],
            plugins: ['transform-runtime', 'syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader?modules=true',
        //   'sass-loader'
        // ]
        use:
          process.env.NODE_ENV === 'production'
            ? [
                MiniCssExtractPlugin.loader,
                'css-loader?modules=true',
                'sass-loader'
              ]
            : ['style-loader', 'css-loader?modules=true', 'sass-loader'] // 开发模式
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules=true',
          'less-loader'
        ]
        /* use: ["style-loader", "css-loader?modules=true", "sass-loader"] 开发模式*/
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
