// import { createServer } from 'http'
// import 'ignore-styles'
require('babel-core/register')({
  presets: ['latest', 'react']
})
const PORT = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'dev'

//@todo make work with development
if (isDev) {
  require('babel-core').transform('code', {
    plugins: ['dynamic-import-node']
  })

  require.extensions['.scss'] = () => {
    return
  }
  require.extensions['.css'] = () => {
    return
  }
}

import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import helmet from 'helmet'
import Loadable from 'react-loadable'
import compression from 'compression'

const app = express()

/*
//@todo make work with development
import webpack from 'webpack' // Webpack
import webpackMiddleware from 'webpack-dev-middleware'
const compiler = webpack(require('../../webpack.server.js'))
app.use(webpackMiddleware(compiler, { serverSideRender: true }))
*/

app.use(compression())
app.use(helmet())
app.use(cookieParser())

const basePath = isDev? path.join(__dirname, '..', '..', 'dist') : path.join(__dirname, 'dist')
app.use(express.static(basePath))

app.use('/', require('./routes').default)
process.on('uncaughtException', (err) => {
  console.log(err)
})


Loadable.preloadAll().then(() => {
  app.listen(PORT, () => console.log('started prot: ' + PORT))
})