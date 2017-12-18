import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/products'
import Products from '../components/ProductsConnector/Products'

class ProductPage extends Component {
  static fetchData(req, params) {
    if (params && params.length >= 2) {
      req.query.menu = { category: params[1] }
    }

    return fetchProducts(req.query)
  }

  render() {
    const { products } = this.props

    return (
      <div>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProducts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)