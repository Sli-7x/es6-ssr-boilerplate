import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Switch } from 'react-router-dom'
import routes from './routes'
// import RedirectWithStatus from './components/Errors/RedirectWithStatus'
// <RedirectWithStatus
//   status={302}
//   from="/about"
//   to="/about-us"
// />


class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Helmet>
          <title>ES6 react ssr</title>
          <meta name="description" content="moebel stuff, tables, kitchen, chairs" />
        </Helmet>
        <main className="content">
          <Switch>
            {routes.map((val, i) => <Route {...val} key={i}/>)}       
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
