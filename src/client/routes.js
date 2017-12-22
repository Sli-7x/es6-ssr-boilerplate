import Loadable from 'react-loadable'
import React from 'react'

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

const Error404 = Loadable({
  loader: () => import('./components/Errors/Error404'),
  loading: Loading,
  delay: 300,
})

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const routes = [
  {
    path: '/',
    exact: true,
    component: List
  },
  {
    path: '/product/:category?',
    component: ProductPage
  },
  {
    path: '/about-us',
    exact: true,
    component: About
  },
  {
    path: '*',
    component: Error404,
    status: 404
  }
]

export default routes