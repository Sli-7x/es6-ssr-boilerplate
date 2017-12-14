import React from 'react'
import { hydrate } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './App'
import Loadable from 'react-loadable'

const preloadedState = window.__INITIAL_STATE__
delete window.__INITIAL_STATE__
const store = configureStore(preloadedState)

// loadComponents().then(() => {
//   hydrate(
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>,
//     document.getElementById('app')
//   )
// })

window.main = () => {
  Loadable.preloadReady().then(() => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('app')
    )
  })
}

/*const renderApp = (Comp) => {
  return hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Comp />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )
}*/

/*if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    renderApp(NewApp)
  })
}*/