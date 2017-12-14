import 'isomorphic-fetch'
import { FILTERS_LOADED } from '../constants'


if (typeof btoa === 'undefined') {
  global.btoa = (str) => {
    return new Buffer(str).toString('base64')
  }
}

let headers = {
  method: 'GET',
  credentials: 'same-origin', // 'include',
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'fake-auth': btoa(JSON.stringify({user: 'baco', pass: 'Condition!512'})),
  }
}

export const fetchFilters = () => (dispatch) => {
  return fetch('http://nt.baco.lt/api/filters', headers)
    .then(res => {
      return res.json()
    })
    .then(res => {
      dispatch({
        type: FILTERS_LOADED,
        payload: res.content.objectsTypes
      })
    })
}