import { FILTERS_LOADED } from '../constants'

const initialState = {
  filters: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTERS_LOADED:
      return { ...state, filters: action.payload }
    default:
      return state
  }
}