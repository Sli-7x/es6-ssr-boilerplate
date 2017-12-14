/*import loadable from 'loadable-components'


export const Home = loadable(() => import('./pages/Home'))
export const List = loadable(() => import('./pages/List'))
export const About = loadable(() => import('./pages/About'))*/

// import React from 'react'
// import Loadable from 'react-loadable'
/*
export const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading() {
    return <div>Loading...</div>
  }
})
export const List = Loadable({
  loader: () => import('./pages/List'),
  loading() {
    return <div>Loading...</div>
  }
})
export const About = Loadable({
  loader: () => import('./pages/About'),
  loading() {
    return <div>Loading...</div>
  }
})*/

export const ProductPage = require('./pages/ProductPage').default
export const List = require('./pages/List').default
export const About = require('./pages/About').default