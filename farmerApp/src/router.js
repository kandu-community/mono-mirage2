import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProfileForm from './views/ProfileForm.vue';
import LogIn from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import FarmProfile from './views/FarmProfile.vue';
import CropCapture from './views/CropCapture.vue';
import ProductCapture from './views/ProductCapture.vue';
import SeedCapture from './views/SeedCapture.vue';
import DistributorCapture from './views/DistributorCapture.vue';
import SupportCapture from './views/SupportCapture.vue';

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
      name: 'ProfileForm',
      component: ProfileForm,
      meta: {
//        requiresAuth: true
      }
    },
    {
      path: '/farm-profile',
      name: 'FarmProfile',
      component: FarmProfile,
      meta: {
//        requiresAuth: true
      }
    },
    {
      path: '/crop-capture',
      name: 'CropCapture',
      component: CropCapture,
      meta: {
//        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'ProductCapture',
      component: ProductCapture,
      meta: {
//        requiresAuth: true
      }
    },
//    {
//      path: '/seeds',
//      name: 'SeedCapture',
//      component: SeedCapture,
//      meta: {
////        requiresAuth: true
//      }
//    },
//    {
//      path: '/distributors',
//      name: 'DistributorCapture',
//      component: DistributorCapture,
//      meta: {
////        requiresAuth: true
//      }
//    },
//    {
//      path: '/support',
//      name: 'SupportCapture',
//      component: SupportCapture,
//      meta: {
////        requiresAuth: true
//      }
//    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})