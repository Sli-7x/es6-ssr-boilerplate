import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Switch } from 'react-router-dom'
import Error404 from './components/Errors/Error404'
import RedirectWithStatus from './components/Errors/RedirectWithStatus'
import { 
  ProductPage,
  About, 
  List,
} from './Load'

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
            <Route exact path="/" component={List}/>
            <RedirectWithStatus
              status={302}
              from="/about"
              to="/about-us"
            />
            <Route exact path="/about-us" component={About}/>
            <Route path="/product/:category?" component={ProductPage}/>
            <Route status={404} component={Error404}/>           
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
