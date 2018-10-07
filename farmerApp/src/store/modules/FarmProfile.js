import { locationGeoData } from '@/api/zaMapAxios'

const state = {
    farmLocation: null,
    showFarmMap: false,
    municipalData: null
}

const getters = {
    farmLocation(state)  {
        return state.farmLocation 
    },
    showFarmMap(state) {
        return state.showFarmMap
    },
    showFarmMap(state) {
        return state.showFarmMap
    },
}

const actions = {
    setFarmLocation({
        state
    }, payload) {
        state.farmLocation = payload
    },
    showFarmMap({
        state
    }, payload) {
        state.showFarmMap = payload
    },
    getMunicipalData({
        state
    }, payload) {
        
    }
}

export default {
    state, getters, actions
}