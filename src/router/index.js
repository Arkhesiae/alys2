import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import Static from "../views/HomePage.vue"
import SelectScreen from "../views/SelectScreen"
import Test from "../views/Test"
import TestView from "../views/TestView"
import Graphe from "../views/graphe"
import Home from "@/views/Home"
import NotFound from "@/components/NotFound"

// import SelectScreen from "../views/SelectScreen.vue"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  // {
  //   path: '/static',
  //   name: 'Static',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: Static
  //       // () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue')
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
    path: '/plane/:id/',
    name: 'Plane',
    props: true,
    component: Home,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '',

        name:'Select',
        component: SelectScreen
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'static',
        component: TestView
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'dynamic',
        component: TestView
      }
    ]
  },

  { path: '/404', component: NotFound },

  { path: "/:catchAll(.*)", redirect: '/404' },

  {
    path: '/testView',
    name: 'TestView',
    component: TestView
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
        // () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
