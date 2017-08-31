var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ["three"],
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: "url-loader?prefix=img/&limit=25000",
              }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            hash: true,
            inject: "body",
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
          })
    ],
    stats: {
        colors: true
    },
    devtool: 'inline-source-map'
};