import qs from 'qs'

export const urlDecode = (str) => {
  if (!str || str.trim() === '') {
    return ''
  }

  let string = str.replace('-and-', ' & ')
    .replace('-', ' ')

  return string.charAt(0).toUpperCase() + string.slice(1)
}

// encode url
export const urlEncode = (str) => {
  return !str || str.trim() === ''? '' : str.replace('&', '-and-').replace(/[^a-zA-Z ]/g, '')
    .toLocaleLowerCase()
    .replace(/\s+/g, '-')
}

export const objEncode = (obj) => {
  return escape(qs.stringify(obj))
}


/**
 * Remove parameter(-s) from query string
 * 
 * @param {string} queryString 
 * @param {array} paramsToRemove 
 * @param {boolean} asObject 
 * @return String|Object
 */
export const removeQueryParams = (queryString, paramsToRemove=[], asObject = false) => {
  if (!queryString || queryString === '' || paramsToRemove.length < 1) {
    return ''
  }

  const query = qs.parse(queryString.slice(1))
  query.page = 1
  return asObject === true? query : `?${qs.stringify(query)}`
}