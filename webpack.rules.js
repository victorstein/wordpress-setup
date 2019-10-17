module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    loaders: [
      {
        loader: 'babel-loader'
      }
    ]
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.(jpg|png|svg|ico|icns|zip)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
      publicPath: '..', // move up from 'main_window'
      context: 'src' // set relative working folder to src
    }
  }
]
