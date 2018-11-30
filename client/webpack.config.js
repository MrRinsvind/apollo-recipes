const webpack = require('webpack');
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/public/index.html",
  filename: "./index.html"
});

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
      }
    ]
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.json', '.js', '.jsx', 'css'],
    modules: [
      'src/app',
      'node_modules'
    ]

  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    htmlWebpackPlugin,
  ],
  devServer: {
    contentBase: './dist',
    port: 3333,
    hot: true,
    historyApiFallback: true,
  }
};