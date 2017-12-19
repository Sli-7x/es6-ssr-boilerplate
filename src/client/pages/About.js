import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

class About extends Component {
  render () {
    return (
      <div>
        <Helmet>
          <title>ES6 react ssr | About</title>
        </Helmet>
        ABOUT US
      </div>
    )
  }
}

export default About