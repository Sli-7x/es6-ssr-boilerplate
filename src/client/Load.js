import Loadable from 'react-loadable'
import React from 'react'

export const ProductPage = Loadable({
  loader: () => import('./pages/ProductPage'),
  loading: Loading,
  delay: 300,
})

export const About = Loadable({
  loader: () => import('./pages/About'),
  loading: Loading,
  delay: 300,
})

export const List = Loadable({
  loader: () => import('./pages/List'),
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