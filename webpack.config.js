const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv == 'production'
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const plugins = () => {
  const array = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
    new ReactLoadablePlugin({
      filename: './dist/js/react-loadable.json',
    }),
  ]

  if (isProd) {
    array.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }))

    array.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }))

    array.push(new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }))
  } else {
    array.push(new HtmlWebpackPlugin({ template: './src/client/index.html', decodeEntities: true, removeComments: true }))
  }

  return array
}

module.exports = {
  devtool: 'source-map',
  entry: {
    'client': [
      'babel-polyfill',
      // 'react-hot-loader/patch',
      './src/client/index'
    ],
    'vendor': ['react', 'react-dom', 'react-router-dom', 'react-instantsearch', 'react-redux', 'react-router', 'react-router-config', 'redux', 'redux-thunk']
  },

  output: {
    path: path.resolve(__dirname, './dist/'),
    chunkFilename: 'js/[name]-[chunkhash].js',
    filename: 'js/[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000&name=./public/[hash].[ext]'
      }
    ]
  },

  plugins: plugins(),
  externals: [],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    should: 'empty',
    'sinon-restore': 'empty',
    child_process: 'empty',
  },
}