import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchFilters } from '../actions/filters'

class List extends Component {
  static fetchData() {
    return fetchFilters()
  }

  componentDidMount() {
    if (!this.props.filters || this.props.filters.length === 0) {
      this.props.fetchFilters()
    }
  }

  render() {
    if (!this.props.filters || this.props.filters.length === 0) {
      return <h1>List page</h1>
    }

    return (
      <div >
        <h1>Home page</h1>
        {
          this.props.filters.map(filter => (
            <div key={filter.id} >
              <span>{filter.title}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ filters: state.filters.filters })
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchFilters }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List)