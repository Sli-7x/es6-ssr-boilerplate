import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/products'
import Loadable from 'react-loadable'
// import Products from '../components/Products/Products'
const Products = Loadable({
  loader: () => import('../components/Products/Products'),
  loading() {
    return <div>Products loading...</div>
  }
})


class ProductPage extends Component {
  static fetchData(req) {
    return fetchProducts(req.query)
  }

  /*lazyLoad() {
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
    }, 100)
  }
  

  componentDidMount() {
    fetchProducts(this.props.location.search)
    window.addEventListener('load', this.lazyLoad, false)
  }

  componentWillReceiveProps() {
    this.lazyLoad()
  }*/

  render() {
    const { products } = this.props

    return (
      <div>
        <Products
          resultsState={products}
          location={this.props.location}
          history={this.props.history}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ products: state.products.items })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProducts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)