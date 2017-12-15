const serialize = require('serialize-javascript')

export default ({ content, data, bundles = [] }) => {
  return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="msapplication-config" content="none">
      <meta name="description" content="moebel stuff, tables, kitchen, chairs">
      <title>Algolia SSR</title>
      <link rel="stylesheet" href="https://unpkg.com/react-instantsearch-theme-algolia@3.0.0/style.min.css" />
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
      ${bundles? bundles.map(bundle => bundle? `<script src="/${bundle.file}"></script>` : '').join('\n') : ''}
      ${bundles? '<script>window.main();</script>' : ''}
    </body>
    </html>`
}