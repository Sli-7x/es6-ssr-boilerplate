import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const configureStore = preloadedState =>
  createStore(reducers, preloadedState, applyMiddleware(thunk))

export default configureStore