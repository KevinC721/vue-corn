import Vue from 'vue'
import VueRouter from 'vue-router'
import Cron from '../views/corn.vue'
import Tree from '../views/tree.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Cron
  },
  {
    path: '/tree',
    name: 'tree',
    component: Tree
  },
  {
    path: '/treeantx',
    name: 'treeantx',
    component: () => import(/* webpackChunkName: "group-foo" */ '../views/treeAntx.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
