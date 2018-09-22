import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: "#8BC34A",
    secondary: "#AED581",
    accent: "#558B2F",
    error: "#E57373",
    warning: "#FFA726",
    info: "#80CBC4",
    success: "#B2FF59"
  },
})