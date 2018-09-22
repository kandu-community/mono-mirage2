import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserProfile from './views/Profile.vue';
import LogIn from './views/Login.vue';
import SignUp from './views/SignUp.vue';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // linkActiveClass: 'active', // something to do with css not much for vuetify
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import ( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})