import { PRODUCTS_LOADED } from '../constants'
import { Products, findResultsState } from '../components/ProductsConnector/Products'

export const fetchProducts = (searchState = {}) => async (dispatch) => {
  const resultState = await findResultsState(Products, { searchState })

  return dispatch({
    type: PRODUCTS_LOADED,
    payload: resultState
  })
}