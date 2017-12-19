import * as Route from './others'

const routes = [
  {
    path: '/',
    exact: true,
    component: Route.List
  },
  {
    path: '/product/:category?',
    component: Route.ProductPage
  },
  {
    path: '/about-us',
    exact: true,
    component: Route.About
  }
]

export default routes