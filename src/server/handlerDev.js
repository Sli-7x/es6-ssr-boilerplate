import express from 'express'
import React from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from '../client/configureStore'
import routes from '../client/routes'
import template from './template'
import App from '../client/App'

const router = express.Router()

router.get('*', async (req, res) => {
  const url = req.url.split(/[?#]/)[0]
  const store = configureStore()
  let context = {}
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
    const appHtml = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )
    
    if (context.status === 404) {
      res.status(404)
    }

    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    const helmet = Helmet.renderStatic()

    const html = template({ data: store.getState(), content: appHtml, bundles: null, helmet })

    res.send(html)
  })
})



export default router