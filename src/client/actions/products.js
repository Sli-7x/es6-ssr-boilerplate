import { PRODUCTS_LOADED } from '../constants'
import { Products, findResultsState } from '../components/Products/Products'

export const fetchProducts = (searchState = {}) => async (dispatch) => {
  const resultState = await findResultsState(Products, { searchState })

  return dispatch({
    type: PRODUCTS_LOADED,
    payload: resultState
  })
}