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
    farmProfile({
        state
    }, payload) {
        state.farmProfile = payload
        console.log('TCL: state.farmProfile', state.farmProfile);
    },
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
                $area: String
                $post_code: Int
                $short_description: String
                $long_description: String
                $website: String
                $visible_ofn: Boolean
                $activities: String
                $cooperative: Boolean
                $date_started: DateTime
                $soil_structure: String
                $soil_ph: String
                $methodz: String
                $erosion_control: String
                $water_source: String
                $water_storage: String
                $irrigation: String
                $fertilizer: String



            ) {
                updateFarm(
                    name: $name totalLand: $totalLand cultivatedLand: $cultivatedLand shareLocation: $shareLocation lat: $lat lng: $lng farmersAssociations: $farmersAssociations area: $area post_code: $post_code short_description: $short_description long_description: $long_description website: $website visible_ofn: $visible_ofn activities: $activities cooperative: $cooperative date_started: $date_started soil_structure: $soil_structure soil_ph: $soil_ph methodz: $methodz erosion_control: $erosion_control water_source: $water_source water_storage: $water_storage irrigation: $irrigation fertilizer: $fertilizer 
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
                        area
                        post_code
                        short_description
                        long_description
                        website
                        visible_ofn
                        activities
                        cooperative
                        date_started
                        soil_structure
                        soil_ph
                        methodz
                        erosion_control
                        water_source
                        water_storage
                        irrigation
                        fertilizer

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
                farmersAssociations: payload.farmersAssociations,
                area: payload.area,
                post_code: payload.post_code,
                short_description: payload.short_description,
                long_description: payload.long_description,
                website: payload.website,
                visible_ofn: payload.visible_ofn,
                activities: payload.activities,
                cooperative: payload.cooperative,
                date_started: payload.date_started,
                soil_structure: payload.soil_structure,
                soil_ph: payload.soil_ph,
                methodz: payload.methodz,
                erosion_control: payload.erosion_control,
                water_source: payload.water_source,
                water_storage: payload.water_storage,
                irrigation: payload.irrigation,
                fertilizer: payload.fertilizer,
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