import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/products'
import Products from '../components/ProductsConnector/Products'
import { urlDecode } from '../urlHelper'

class ProductPage extends Component {
  static fetchData({ req, params, store }) {
    if (params && params.length >= 2) {
      req.query.menu = { category: urlDecode(params[1]) }
    }

    return store.dispatch(fetchProducts(req.query))
  }

  render() {
    const { products } = this.props

    return (
      <div>
        <Helmet>
          <title>ES6 react ssr | Products</title>
        </Helmet>
        <Products
          resultsState={products}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ products: state.products.items })

export default connect(mapStateToProps)(ProductPage)