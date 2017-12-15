import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from '../client/configureStore'

import routes from '../client/routes'
import template from './template'
import App from '../client/App'

const router = express.Router()
const store = configureStore()


router.get('*', (req, res) => {
  const url = req.url.split(/[?#]/)[0]
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
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )
    
    if (context.status === 404) {
      return res.status(404)
    }

    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    res.send(template({ data: store.getState(), content: appHtml, bundles: null }))
  })
})


export default router