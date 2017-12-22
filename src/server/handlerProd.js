import express from 'express'
import React from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../../dist/js/react-loadable.json'
import configureStore from '../client/configureStore'
import routes from '../client/routes'
import template from './template'
import App from '../client/App'
import { ssrCache, cacheMiddleware, getCacheKey } from './cacheMiddleware'

const router = express.Router()


router.get('*', cacheMiddleware, async (req, res) => {
  const url = req.url.split(/[?#]/)[0]
  const store = configureStore()
  let modules = []
  let params = null
  
  if (req.params) {
    params = req.params[0].slice(1).split('/')
  }

  const promises = await routes.reduce((acc, route) => {
    if (matchPath(url, route) && route.component) {
      route.component.preload().then((data) => {
        if (data.default.fetchData) {
          return acc.push(Promise.resolve(data.default.fetchData({ store, req, params })))
        }
      })
    }

    return acc
  }, [])

  return Promise.all(promises).then(() => {
    let context = {}  

    const appHtml = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    )

    let bundles = getBundles(stats, modules)
    if (context.status === 404) {
      res.status(404)
    }

    if (context.status === 301  || context.status === 302) {
      return res.redirect(context.status, context.url)
    }

    const helmet = Helmet.renderStatic()

    const html = template({ data: store.getState(), content: appHtml, bundles, helmet })

    if (context.status !== 404) {
      ssrCache.set(getCacheKey(req), html)
    }

    res.send(html)
  })
})

export default router
