import Vue from 'vue'
import Vuex from 'vuex'
import ProfileStepper from './modules/ProfileStepper'

Vue.use(Vuex)

export const store = new Vuex.Store({

    modules: {
        ProfileStepper
    }
});