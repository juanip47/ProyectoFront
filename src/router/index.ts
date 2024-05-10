import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticulosView from '../views/ArticulosView.vue'
import EditarArticuloView from '../views/EditarArticuloView.vue'
import CrearArticuloView from '../views/CrearArticuloView.vue'
import AdminView from '../views/AdminView.vue'
import SeccionesView from '../views/SeccionesView.vue'
import ArticulosPorSeccionView from '../views/ArticulosPorSeccionView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: ArticulosView
  },
  {
    path: '/editarArticulo',
    name: 'editarArticulo',
    component: EditarArticuloView
  },
  {
    path: '/crearArticulo',
    name: 'crearArticulo',
    component: CrearArticuloView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/secciones',
    name: 'secciones',
    component: SeccionesView
  },
  {
    path: '/articulosPorSeccion',
    name: 'articulosPorSeccion',
    component: ArticulosPorSeccionView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
