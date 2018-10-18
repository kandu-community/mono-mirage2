import {
    locationWardData,
    locationProvince
} from "@/api/zaMapAxios";
import apollo from '@/apollo'
import gql from 'graphql-tag'
import upsertToPouch from '@/helpers/upsertToPouch'


const state = {
    farmLocation: null,
    showFarmMap: false,
    municipalData: {
        ward: null,
        province: null
    },
    farmProfile: null
}

const getters = {
    farmLocation(state) {
        return state.farmLocation
    },
    showFarmMap(state) {
        return state.showFarmMap
    },
    municipalData(state) {
        return state.municipalData
    },
    farmProfile(state) {
        return state.farmProfile
    },
}

const actions = {
    setFarmLocation({
        state
    }, payload) {
        state.farmLocation = payload
    },
    showFarmMap({
        state,
        rootState
    }, payload) {
        state.showFarmMap = payload
    },
    async getMunicipalData({
        state
    }, payload) {
        state.municipalData.ward = await locationWardData(payload)
        state.municipalData.province = await locationProvince(payload)
        console.log('TCL: ---------------------------------------------');
        console.log('TCL: state.municipalData', state.municipalData);
        console.log('TCL: ---------------------------------------------');

    },
    async saveFarmProfile({
        state,
        rootState
    }, payload) {
        console.log('TCL: payload', payload);
        state.farmProfile = payload
        const response = await apollo.mutate({
            mutation: gql `
            mutation updateFarm(
                $name: String
                $totalLand: Int!
                $cultivatedLand: Int!
                $shareLocation: Boolean!
                $lat: Float!
                $lng: Float!
                $farmersAssociations: String
            ) {
                updateFarm(
                    name: $name totalLand: $totalLand cultivatedLand: $cultivatedLand shareLocation: $shareLocation lat: $lat lng: $lng farmersAssociations: $farmersAssociations
                ) {
                    farm {
                        id
                        name
                        totalLand
                        cultivatedLand
                        shareLocation
                        gpsPoints {
                            lat
                            lng
                        }
                        farmersAssociations
                    }

                }
            }
            `,
            variables: {
                name: payload.name,
                totalLand: payload.totalLand,
                cultivatedLand: payload.cultivatedLand,
                shareLocation: payload.shareLocation,
                lat: payload.gpsPoints.lat,
                lng: payload.gpsPoints.lng,
                farmersAssociations: payload.farmersAssociations
            }
        })
        let farmData = response.data.updateFarm.farm
        delete farmData.__typename
        console.log('TCL: farmData', farmData);
        await upsertToPouch("farm", farmData)


    }
}

export default {
    state,
    getters,
    actions
}