import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Switch } from 'react-router-dom'
// import routes from './routes'

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
        <main className="content">
          <Switch>
            <Route exact path="/" component={List}/>
            <Route exact path="/About" component={About}/>
            <Route exact path="/product" component={ProductPage}/>
          </Switch>
        </main>
        <Footer />
      </div>
    )
    /*return (
      <div>
        <Header />
        <main className="content">
          <Switch>
            {routes.map((route, i) => <Route key={i} {...route} />)}
          </Switch>
        </main>
        <Footer />
      </div>
    )*/
  }
}

export default App