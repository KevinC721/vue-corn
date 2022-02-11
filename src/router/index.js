import Vue from 'vue'
import VueRouter from 'vue-router'
import Cron from '../views/corn.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Cron
  },
  {
    path: '/treeantx',
    name: 'treeantx',
    component: () => import(/* webpackChunkName: "group-foo" */ '../views/treeAntx.vue')
  },
  {
    path: '/tablerelation',
    name: 'tablerelation',
    component: () => import(/* webpackChunkName: "group-foo" */ '../views/tableRelation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
