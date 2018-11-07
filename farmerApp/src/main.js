import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueOffline from 'vue-offline'
import apolloClient from './apollo'



import
VueApollo
from 'vue-apollo'
import {
  store
} from './store/store'

import vueMoment from 'vue-moment'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

// install the vue-moment plugin
Vue.use(VueOffline, vueMoment, Vuelidate.default); // I've always done this wrong: importing into each component that uses it instead of here as a "global"

// install the vue plugin
Vue.use(VueApollo)

// Then we install the Vue Apollo plugin, and we create a new instance of the Vue Apollo plugin using the apolloClient created as our default client.
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Recall from our server implementation, only an authenticated user can create a new meetup. So we need a way to implement this on the frontend. 
router.beforeEach((to, from, next) => {
  // if any routes have a meta object with requiresAuth set to true ...
  if (to.matched.some(record => record.meta.requiresAuth)) {
    localStorage.getItem('USER_TOKEN') ? next() : next('/login') // ...check if there is a USER_TOKEN in localstorage, if not found, redirect user to the login page.
  } else {
    next() // ... otherwise, we allow the user to continue as intended.
  }
})

new Vue({
  router,
  store,
  provide: apolloProvider.provide(), // Lastly, we make use of the apolloProvider object by adding it in our Vue instance, the same way we would use Vue router.

  render: h => h(App)
}).$mount('#app')