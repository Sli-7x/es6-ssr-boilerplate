import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/products'
import Products from '../components/Products/Products'

class ProductPage extends Component {
  static fetchData(req) {
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
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ products: state.products.items })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProducts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)