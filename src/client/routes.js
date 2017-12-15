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
    path: '/about',
    component: Route.About
  }
]

export default routes