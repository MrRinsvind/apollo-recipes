require ('./init-env') // SHOULD BE FIRST

const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/public/index.html",
  filename: "./index.html"
})

module.exports = {

    entry: ['babel-polyfill', './src/app/index.js'],
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
          use: ["style-loader", "css-loader"]
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
    ],
    devServer: {
      contentBase: './dist',
      port: process.env.CLIENT_PORT,
      hot: true,
      historyApiFallback: true,
    },
  }


