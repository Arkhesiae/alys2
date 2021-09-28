import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import Static from "../views/Static.vue"
import SelectScreen from "../views/SelectScreen"
import Test from "../views/Test"
import TestView from "../views/TestView"
import Graphe from "../views/graphe"
// import SelectScreen from "../views/SelectScreen.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/static',
  //   name: 'Static',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: Static
  //       // () => import(/* webpackChunkName: "about" */ '../views/Static.vue')
  // },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/graph',
    name: 'Graphe',
    component: Graphe
  },

  {
    path: '/testView',
    name: 'TestView',
    component: TestView
  },

  {
    path: '/select-screen/:type',
    name: 'SelectScreen',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SelectScreen,
    // children: [{
    //   path: '',
    //   components: {
    //     a: Static,
    //     b: Home
    //   }
    // }]
        // () => import(/* webpackChunkName: "about" */ '../views/Static.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
