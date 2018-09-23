import Vue from 'vue'
import Vuex from 'vuex'
import ProfileStepper from './modules/ProfileStepper'
import AppState from "./modules/AppState";

Vue.use(Vuex)

export const store = new Vuex.Store({

    modules: {
        ProfileStepper,
        AppState
    }
});