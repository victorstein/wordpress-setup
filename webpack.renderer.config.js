const rules = require('./webpack.rules')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  // Put your normal webpack config below here
  plugins: [
    new CopyWebpackPlugin(
      [{ from: path.join('src', 'assets'), to: 'assets' }],
      {
        ignore: ['.gitkeep']
      }
    )
  ],
  module: {
    rules
  }
}
