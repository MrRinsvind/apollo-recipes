const webpack = require('webpack');
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/public/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
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
    // ["@babel/plugin-transform-runtime", {
    //   "corejs": false,
    //   "helpers": true,
    //   "regenerator": true,
    //   "useESModules": false
    // }],
  ],
  devServer: {
    contentBase: './dist',
    port: 3333,
    hot: true,
    historyApiFallback: true,
  }
};