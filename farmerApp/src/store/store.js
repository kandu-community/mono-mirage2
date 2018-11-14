import Vue from 'vue'
import Vuex from 'vuex'
import ProfileStepper from './modules/ProfileStepper'
import AppState from "./modules/AppState";
import FarmProfile from "./modules/FarmProfile";
import CropCapture from "./modules/CropCapture";
import ProductCapture from "./modules/ProductCapture";
import SeedCapture from "./modules/SeedCapture";
import DistributorCapture from "./modules/DistributorCapture";
import SupportCapture from "./modules/SupportCapture";

Vue.use(Vuex)

export const store = new Vuex.Store({

    modules: {
        ProfileStepper,
        AppState,
        FarmProfile,
        CropCapture,
        ProductCapture,
        SeedCapture,
		DistributorCapture,
		SupportCapture
    }
});