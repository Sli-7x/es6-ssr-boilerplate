const serialize = require('serialize-javascript')

export const Header = () => (
  `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="msapplication-config" content="none">
  <title>Algolia SSR</title>
  </head><body>
  <div id="app">`
)

export const Footer = ({store, bundles}) => (
  `</div>
  <script>window.__INITIAL_STATE__ = ${serialize(store.getState(), { isJSON: true })}</script>
  <script src="/js/vendor.js"></script>
  <script src="/js/client.js"></script>
  ${bundles.map(bundle => bundle ? `<link rel="preload" href="/${bundle.file}" as="script"/>` : '').join('\n')}
  <script>window.main();</script>
  <link rel="stylesheet" href="https://unpkg.com/react-instantsearch-theme-algolia@3.0.0/style.min.css" lazyload="1"/>`
)


export default ({ content, data, bundles = [] }) => {
  return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="msapplication-config" content="none">
      <title>Algolia SSR</title>
      <style type="text/css">
      .ais-InstantSearch__root {
        align-items: center;
      }
      </style>
    </head>
    <body>
      <div id="app">${content}</div>
      <script>window.__INITIAL_STATE__ = ${serialize(data, { isJSON: true })}</script>
      <script src="/js/vendor.js"></script>
      <script src="/js/client.js"></script>
      ${bundles.map(bundle => bundle? `<script src="/${bundle.file}"></script>` : '').join('\n')}
      <script>window.main();</script>
      <link rel="stylesheet" href="https://unpkg.com/react-instantsearch-theme-algolia@3.0.0/style.min.css" />
    </body>
    </html>`
}