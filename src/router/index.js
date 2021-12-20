import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import Static from "../views/HomePage.vue"
import SelectScreen from "../views/Plane/SelectScreen"
import Test from "../views/Useless/Test"
import AircraftForm from "../views/Plane/AircraftForm/AircraftForm"
import Graphe from "../views/Useless/graphe"
import PlanePage from "@/views/PlanePage/PlanePage"
import NotFound from "@/components/NotFound"
import flightProfile from "@/views/Plane/AircraftForm/Apps/flightProfile"
import StaticPerformances from "@/views/Plane/AircraftForm/Apps/StaticPerformances"

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
    component: PlanePage,
    children: [
      {
        path: '',
        name:'Select',
        component: SelectScreen
      },
      {
        path: 'aircraftForm',
        component: AircraftForm,
        children : [
          {
            path: 'dynamic',
            component: flightProfile
          },
          {
            path: 'sPerformances',
            component: StaticPerformances
          }
        ]
      },

    ]
  },

  { path: '/404', component: NotFound },

  { path: "/:catchAll(.*)", redirect: '/404' },

  // {
  //   path: '/testView',
  //   name: 'TestView',
  //   component: TestView
  // },
  //
  // {
  //   path: '/testView',
  //   name: 'TestView',
  //   component: TestView
  // },

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
