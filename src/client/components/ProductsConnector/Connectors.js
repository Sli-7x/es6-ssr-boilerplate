import React from 'react'
import qs from 'qs'
import { Link } from 'react-router-dom'
import { HitComponent } from './HitComponent'
import { connectPagination, connectMenu, connectHits, connectRefinementList } from 'react-instantsearch/connectors'
import { urlEncode, removeQueryParams } from '../../urlHelper'
import styles from './productsStyles.css'

// Pagination
const MyPagination = (props) => { 
  return [...Array(props.nbPages).keys()].map((val, i) => {
    const pageNr = i + 1

    const newState = { ...props.searchState, page: pageNr }
    delete newState.menu

    return (
      <Link
        className={`${styles.page} ${props.currentRefinement === pageNr ? styles.pageActive : ''}`}
        key={i}
        to={`?${qs.stringify(newState)}`}
        onClick={(e) => {e.preventDefault(); props.refine(pageNr, props.query)}}
      >
        {pageNr}
      </Link>
    )
  })
}
export const Pagination = connectPagination(MyPagination)


// Menu
const MyMenu = (props) => {
  return props.items.map((val, i) => (
    <div key={i} className={`${styles.category} ${props.currentRefinement && props.currentRefinement.toLowerCase() === val.label.toLowerCase() ? styles.categoryActive : ''}`}>
      <Link
        to={`/product/${urlEncode(val.value)}${removeQueryParams(props.query, ['page'])}`}
        onClick={(e) => { e.preventDefault(); props.refine(val.value) }}
      >
        {val.label} ({val.count})
      </Link>
    </div>
  ))
}

export const Menu = connectMenu(MyMenu)


// Items
const MyHits = ({ hits }) => hits ? hits.map((hit, i) => <HitComponent hit={hit} key={i} />) : ''
export const Items = connectHits(MyHits)



const MyRefinementList = ({ items, refine, attributeName }) => {
  return items.map((val, i) => {
    return (
      <div key={i}>
        <label htmlFor={`${i}-${attributeName}`}>{val.label}</label>
        <input
          id={`${i}-${attributeName}`}
          type="checkbox"
          checked={val.isRefined}
          onChange={() => { refine(val.value) }}
        />
      </div>
    )
  })
}

export const RefinementList = connectRefinementList(MyRefinementList)
