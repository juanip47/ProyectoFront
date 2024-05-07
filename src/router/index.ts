import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticulosView from '../views/ArticulosView.vue'
import EditarArticuloView from '../views/EditarArticuloView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Articulos',
    name: 'articulos',
    component: ArticulosView
  },
  {
    path: '/EditarArticulo',
    name: 'editarArticulo',
    component: EditarArticuloView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
