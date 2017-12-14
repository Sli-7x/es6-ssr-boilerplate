import React, { Component } from 'react'
import qs from 'qs'
import { createInstantSearch } from 'react-instantsearch/server'
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Highlight,
  Pagination,
} from 'react-instantsearch/dom'
import { PRODUCTS_APP_ID, PRODUCTS_API_KEY, PRODUCTS_INDEX_NAME } from '../../constants'

const { InstantSearch, findResultsState } = createInstantSearch()

const createURL = state => `?${qs.stringify(state)}`
const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : ''

const urlToSearchState = (location) => qs.parse(location.search.slice(1))

const HitComponent = ({ hit }) => {
  return <div className="hit">
    <div>
      <div className="hit-picture">
        <img src={`${hit.properties.base_image_url}`} />
      </div>
    </div>
    <div className="hit-content">
      <div>
        <Highlight attributeName="properties.title" hit={hit} />
        <div>{hit.properties.price} {hit.properties.currency}</div>
      </div>
      <div className="hit-type">
        <Highlight attributeName="type" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attributeName="description" hit={hit} />
      </div>
    </div>
  </div>
}

class Products extends Component {
  constructor(props) {
    super(props)
    this.onSearchStateChange = this.onSearchStateChange.bind(this)
    this.state = {
      searchState: process.browser ? urlToSearchState(props.location) : {}
    }
  }

  componentWillReceiveProps(props) {
    if (props.location !== this.props.location) {
      this.setState({ searchState: urlToSearchState(props.location) })
    }
  }

  onSearchStateChange(searchState) {
    this.props.history.push(
      searchStateToUrl(this.props, searchState),
      searchState,
    )
    this.setState({ searchState })
  }

  render() {
    return (
      <InstantSearch
        appId={PRODUCTS_APP_ID}
        apiKey={PRODUCTS_API_KEY}
        indexName={PRODUCTS_INDEX_NAME}
        resultsState={this.props.resultsState}
        searchState={this.props && this.props.searchState
          ? this.props.searchState
          : this.state.searchState}
        onSearchStateChange={this.onSearchStateChange}
        createURL={createURL}
      >
        <Configure hitsPerPage={10} />
        <SearchBox />
        <Hits hitComponent={HitComponent} />
        <RefinementList attributeName="category" />
        <Pagination />
      </InstantSearch>
    )
  }
}

export { Products, findResultsState }
export default Products