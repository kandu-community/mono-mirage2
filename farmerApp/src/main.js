import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueOffline from 'vue-offline'

import {
  ApolloClient
} from 'apollo-client'
import {
  HttpLink
} from 'apollo-link-http'
import {
  setContext
} from 'apollo-link-context'
import {
  onError
} from "apollo-link-error";
import {
  InMemoryCache
} from 'apollo-cache-inmemory'
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

const httpLink = new HttpLink({ // Here, we create a new instance of httpLink with the URL ( http://localhost:4000/) of our GraphQL server.
  // uri: 'https://mirage-advanced-frdudlwdkj.now.sh/'
  uri: 'http://localhost:4000/'
})

const errorLink = onError(
  ({
    operation,
    response,
    graphQLErrors,
    networkError
  }) => {
    // temp to see what's wrong with signup
    if (graphQLErrors) {
      console.log("gqlError", {
        graphQLErrors
      });
    }
    if (networkError) console.log({
      networkError
    });
  }
);

const httpLinkAuth = setContext((_, { // Then we make use of the setContext object to create an httpLinkAuth that gets the user token from local storage and return the headers, which contain the Authorization header.
  headers
}) => {
  // get the authentication token from localstorage if it exists
  const token = localStorage.getItem('USER_TOKEN')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '' 
    }
  }
})
var link = errorLink.concat(httpLink)
link = httpLinkAuth.concat(link)

// Next, we create an Apollo client using the httpLink and httpLinkAuth created above and specify we want an in-memory cache.
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

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

export default apolloClient