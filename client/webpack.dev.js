const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    port: 3333,
    hot: true,
    historyApiFallback: true,
  },
  module: {
     rules: [
       {
         test: /\.css/,
         use: [{ loader: 'style-loader' }, { loader: 'css-loader' },]
        }
     ]
   },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
})