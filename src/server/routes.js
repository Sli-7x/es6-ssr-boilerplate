import express from 'express'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'

import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../../dist/js/react-loadable.json'

import configureStore from '../client/configureStore'

import routes from '../client/routes'
import template from './template'
import App from '../client/App'

const router = express.Router()
const store = configureStore()



router.get('*', (req, res) => {
  const url = req.url.split(/[?#]/)[0]
  let modules = []

  const context = {}  

  const promises = routes.reduce((acc, route) => {
    if (matchPath(url, route) && route.component && route.component.fetchData) {
      acc.push(Promise.resolve(store.dispatch(route.component.fetchData(req, res))))
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

    // console.log('---- Modules ----')
    // console.log(bundles)

    if (context.status === 404) {
      return res.status(404)
    }

    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    res.send(template({ data: store.getState(), content: appHtml, bundles }))
  })
})

export default router