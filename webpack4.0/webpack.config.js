var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var HtmlPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[hash].js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [

                    'style-loader',
                    'css-loader?modules=true',
                    'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlPlugin({
            title: '试试'
        })
    ]
}