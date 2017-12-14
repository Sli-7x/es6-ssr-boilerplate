import express from 'express'
import React from 'react'
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'

import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../../dist/js/react-loadable.json'

import configureStore from '../client/configureStore'
import { Header, Footer } from './template'
import routes from '../client/routes'
import App from '../client/App'

const router = express.Router()
const store = configureStore()

router.get('*', (req, res) => {
  const url = req.url.split(/[?#]/)[0]
  let modules = []

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(Header())

  const context = {}

  const promises = routes.reduce((acc, route) => {
    if (matchPath(url, route) && route.component && route.component.fetchData) {
      acc.push(Promise.resolve(store.dispatch(route.component.fetchData(req, res))))
    }
    return acc
  }, [])

  return Promise.all(promises).then(() => {
    // @todo fix this with mixing with stream
    renderToStaticMarkup(<Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>)

    const appHtml = renderToNodeStream(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )

    let bundles = getBundles(stats, modules)

    // console.log('---- Modules ----')
    // console.log(bundles)

    if (context.status === 404) {
      return res.status(404)
    }

    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    appHtml.pipe(res, { end: false })
    appHtml.on('end', () => {
      res.write(Footer({store, bundles}))
      res.end('</body></html>')
    })
  })
})

// ${bundles.map(bundle => bundle? `<script src="/${bundle.file}"></script>` : '').join('\n')}
// ${bundles.map(bundle => bundle? `<link rel="preload" href="/${bundle.file}" as="script"/>` : '').join('\n')}

export default router