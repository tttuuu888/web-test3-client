import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/list/:page',
    name: 'list',
    props: true,
    component: Home
  },
  {
    path: '/post/:postid',
    name: 'post',
    props: true,
    component: Home
  },
  {
    path: '/search/title/:page',
    name: 'searchtitle',
    props: true,
    component: Home
  },
  {
    path: '/search/author/:page',
    name: 'searchauthor',
    props: true,
    component: Home
  },
]

const router = new VueRouter({
  hashbang: false,
  mode: 'history',
  routes
})

export default router
