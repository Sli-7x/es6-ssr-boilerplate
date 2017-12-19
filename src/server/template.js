const serialize = require('serialize-javascript')

export default ({ content, data, bundles = [], helmet }) => {
  return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="msapplication-config" content="none">
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="app">${content}</div>
      <script>window.__INITIAL_STATE__ = ${serialize(data, { isJSON: true })}</script>
      <script src="/js/vendor.js"></script>
      <script src="/js/client.js"></script>
      ${bundles? bundles.map(bundle => bundle? `<script src="/${bundle.file}"></script>` : '').join('\n') : ''}
      ${bundles? '<script>window.main();</script>' : ''}
      <link href="/css/global.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" lazyload="1"/>
    </body>
    </html>`
}