const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv == 'production'
const { ReactLoadablePlugin } = require('react-loadable/webpack')
const distPath = path.join(__dirname, 'dist')

const plugins = () => {
  const array = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: 'static/css/*', to: `${distPath}/css/[name].[ext]` },
      { from: 'static/images/*', to: `${distPath}/images/[name].[ext]` },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
    new ExtractTextPlugin({
      filename: 'css/main.css',
      disable: false,
      allChunks: true,
      ignoreOrder: true
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
    array.push(new ReactLoadablePlugin({
      filename: './dist/js/react-loadable.json',
    }))
  } else {
    array.push(new webpack.HotModuleReplacementPlugin())
  }

  return array
}

module.exports = {
  devtool: 'source-map', // eval
  entry: {
    'client': isProd? ['babel-polyfill', './src/client/index'] : [
      'babel-polyfill',
      'webpack-hot-middleware/client?name=client',
      './src/client/index'
    ],
    'vendor': ['react', 'react-dom', 'react-router-dom', 'react-instantsearch', 'react-redux', 'react-router', 'react-router-config', 'redux', 'redux-thunk']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
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
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'style-loader',
      //     'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
      //   ]
      // },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
        })
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