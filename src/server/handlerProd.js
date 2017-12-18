import express from 'express'
import React from 'react'
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
const store = configureStore()


router.get('*', cacheMiddleware, (req, res) => {
  const url = req.url.split(/[?#]/)[0]
  let modules = []
  const context = {}  
  let params = null

  if (req.params) {
    params = req.params[0].slice(1).split('/')
  }

  const promises = routes.reduce((acc, route) => {
    if (matchPath(url, route) && route.component && route.component.fetchData) {
      acc.push(Promise.resolve(store.dispatch(route.component.fetchData(req, params))))
    }
    return acc
  }, [])

  return Promise.all(promises).then(() => {
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
      return res.status(404)
    }

    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    const html = template({ data: store.getState(), content: appHtml, bundles })
    ssrCache.set(getCacheKey(req), html)

    res.send(html)
  })
})

export default router
