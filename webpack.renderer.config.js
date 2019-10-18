const rules = require('./webpack.rules')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  // Put your normal webpack config below here
  plugins: [
    new CopyWebpackPlugin(
      [{ from: path.join('src', 'assets'), to: 'assets' }],
      {
        ignore: ['.gitkeep']
      }
    ),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  optimization: {
    splitChunks: {
      // chunks: 'all',
      // name: false,
      cacheGroups: {
        default: false
      }
    }
  },
  module: {
    rules
  }
}
