import { combineReducers } from 'redux'
import filters from './filters'
import products from './products'

const rootReducer = combineReducers({
  filters,
  products
})

export default rootReducer