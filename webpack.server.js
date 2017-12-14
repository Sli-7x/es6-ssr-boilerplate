const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv == 'production'

module.exports = {
  entry: {
    server: ['babel-polyfill', path.resolve(__dirname, 'src/server/server.js')]
  },

  output: {
    path: path.resolve(__dirname, './'),
    libraryTarget: 'commonjs2',
    filename: 'server.min.js'
  },
  target: 'node',
  node: {
    console: true,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: /node_modules/,
        loader: 'css-loader/locals?module&localIdentName=[name]__[local]___[hash:base64:5]',
      }
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProd? true : false,
      debug: isProd? false : true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ],

  externals: nodeExternals(),
}