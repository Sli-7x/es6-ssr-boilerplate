import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Switch } from 'react-router-dom'
import Error404 from './components/Errors/Error404'
import RedirectWithStatus from './components/Errors/RedirectWithStatus'
import Loadable from 'react-loadable'

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const ProductPage = Loadable({
  loader: () => import('./pages/ProductPage'),
  loading: Loading,
  delay: 300,
})

const About = Loadable({
  loader: () => import('./pages/About'),
  loading: Loading,
  delay: 300,
})

const List = Loadable({
  loader: () => import('./pages/List'),
  loading: Loading,
  delay: 300,
})

class App extends Component {
  render() {
    return (
      <div>
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
