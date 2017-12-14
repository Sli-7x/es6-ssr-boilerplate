import React, { Component } from 'react'
import qs from 'qs'
import { createInstantSearch } from 'react-instantsearch/server'
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch/dom'
import { HitComponent } from './HitComponent'
import styles from './productsStyles.css'

const { InstantSearch, findResultsState } = createInstantSearch()

const createURL = state => `?${qs.stringify(state)}`
const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : ''

const urlToSearchState = (location) => qs.parse(location.search.slice(1))


class Products extends Component {
  constructor(props) {
    super(props)
    this.onSearchStateChange = this.onSearchStateChange.bind(this)
    this.state = {
      searchState: process.browser ? urlToSearchState(props.location) : {}
    }
  }

  lazyLoad() {
    setTimeout(() => {
      const allimages = document.getElementsByTagName('img')
      for (const val in allimages) {
        if (!isNaN(parseInt(val, 10)) && allimages[val] && allimages[val].getAttribute('data-src')) {
          const src = allimages[val].getAttribute('data-src')
          if (val && allimages[val]) {
            allimages[val].setAttribute('src', src)
          }
        }
      }
    }, 300)
  }

  componentDidMount () {
    window.addEventListener('load', this.lazyLoad, false)
    this.lazyLoad()
  }
  

  componentWillReceiveProps(props) {
    this.lazyLoad()
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
    const search = this.props && this.props.searchState? this.props.searchState : this.state.searchState
    
    return (
      <InstantSearch
        appId="latency"
        apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        indexName="ikea"
        resultsState={this.props.resultsState}
        onSearchStateChange={this.onSearchStateChange}
        searchState={search}
        createURL={createURL}
      >
        <Configure hitsPerPage={10} />
        <div className={styles.header}>
          <h1>React InstantSearch + Redux + SSR + Code split</h1>
          <SearchBox />
        </div>
        <div className={styles.content}>
          <div className={styles.menu}>
            <RefinementList attributeName="category" />
          </div>
          <div className={styles.results}>
            <Hits hitComponent={HitComponent} />
          </div>
        </div>
        <div className={styles.footer}>
          <Pagination />
        </div>
      </InstantSearch>
    )
  }
}

export { Products, findResultsState }
export default Products