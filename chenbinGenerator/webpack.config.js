const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env", {
                                "targets": {
                                    "browsers": ["last 2 versions", "safari >= 7", "iOS >= 8"]
                                }
                            }], 'react','es2015', 'stage-0'
                        ],
                        "plugins": [
                            "transform-runtime",
                            "syntax-dynamic-import"
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader?modules=true", "sass-loader"]
                /* use: ["style-loader", "css-loader?modules=true", "sass-loader"] 开发模式*/
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}