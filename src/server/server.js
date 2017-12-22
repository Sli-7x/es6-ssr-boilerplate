require('dotenv').config()
require('babel-core/register')({
  presets: ['latest', 'react']
})
const PORT = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'serverDev'

// for development
if (isDev) {
  require('babel-core').transform('code', {
    plugins: [
      'css-modules-transform'
    ]
  })
}

import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import Loadable from 'react-loadable'
import compression from 'compression'

const app = express()

app.use(compression())
app.use(helmet())
app.use(cookieParser())

process.on('uncaughtException', (err) => {
  console.log(err)
})

if (isDev) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(require('../../webpack.config.js'))
  const options = {
    serverSideRender: true,
    stats: {
      colors: true
    } 
  }
  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(compiler))
  app.use('/', require('./handlerDev').default)
  app.listen(PORT, () => console.log('started port: ' + PORT))
} else {
  app.use('/js', express.static(path.join('dist', 'js'), { redirect: false }))
  app.use('/css', express.static(path.join('dist', 'css'), { redirect: false }))
  app.use('/', require('./handlerProd').default)
  Loadable.preloadAll().then(() => {
    app.listen(PORT, () => console.log('started port: ' + PORT))
  })
}

