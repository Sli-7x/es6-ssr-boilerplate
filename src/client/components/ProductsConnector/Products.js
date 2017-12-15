import React, { Component } from 'react'
import qs from 'qs'
import { createInstantSearch } from 'react-instantsearch/server'
import {
  RefinementList,
  SearchBox,
  Configure,
  Pagination,
  Menu,
  CurrentRefinements,
  ScrollTo
} from 'react-instantsearch/dom'
import { connectHits } from 'react-instantsearch/connectors'
import { HitComponent } from './HitComponent'
import styles from './productsStyles.css'

const { InstantSearch, findResultsState } = createInstantSearch()


const MyHits = ({ hits }) => hits ? hits.map((hit, i) => <HitComponent hit={hit} key={i} />) : ''
const Items = connectHits(MyHits)


const createURL = (state) => {
  const cat = state.menu && state.menu.category ? `/${state.menu.category}` : ''
  const obj = { ...state }
  delete obj.menu

  return `/product${cat}?${qs.stringify(obj)}`
}

const urlToSearchState = (location, props) => {
  if (!location) {
    return
  }

  const obj = qs.parse(location.search.slice(1))

  if (props.match.params.category) {
    obj.menu = { category: props.match.params.category }
  }

  return obj
}

class Products extends Component {
  constructor(props) {
    super(props)
    this.onSearchStateChange = this.onSearchStateChange.bind(this)
    this.state = {
      searchState: props.location ? urlToSearchState(props.location, props) : props.searchState
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

  componentDidMount() {
    this.lazyLoad()
  }


  componentWillReceiveProps(props) {
    this.lazyLoad()
    if (props.location !== this.props.location) {
      this.setState({ searchState: urlToSearchState(props.location, props) })
    }
  }

  onSearchStateChange(searchState) {
    this.props.history.push(createURL(searchState))

    if (this.props.match.params.category) {
      searchState.menu = { category: this.props.match.params.category }
    }

    this.setState({ searchState })
  }

  render() {
    const search = this.props && this.props.searchState ? this.props.searchState : this.state.searchState

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
        <Configure hitsPerPage={12} />
        <div className={styles.header}>
          <h1>React InstantSearch + Redux + SSR + Code split</h1>

          <SearchBox />
          <CurrentRefinements />
        </div>
        <div className={styles.content}>
          <div className={styles.menu}>
            <Menu attributeName="category" />
          </div>
          <div className={styles.gridContent}>
            <Items />
          </div>
          <div className={styles.filters}>
            <RefinementList attributeName="colors" />
            <div style={{ paddingTop: '30px' }}>
              <RefinementList attributeName="materials" />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Pagination showLast={false} showFirst={false} />
        </div>
      </InstantSearch>
    )
  }
}

export { Products, findResultsState }
export default Products