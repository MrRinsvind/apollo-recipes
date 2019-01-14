require ('./init-env') // SHOULD BE FIRST

const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const Dotenv = require('dotenv-webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/public/index.html",
  filename: "./index.html"
})

module.exports = {
    entry: ['babel-polyfill', './src/app/index.js'],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
       chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          }
        }, {
          test: /\.css$/,
          use: ["css-loader"]
        }, {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {}
            }
          ]
        }
      ]
    },
    resolve: {
      mainFields: ['browser', 'main', 'module'],
      extensions: ['.json', '.js', '.jsx', 'css'],
      modules: [
        'node_modules',
        'src/app'
      ]

    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      htmlWebpackPlugin,
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
    ],
    devServer: {
      contentBase: './dist',
      port: process.env.CLIENT_PORT,
      hot: true,
      historyApiFallback: true,
    },
  }


