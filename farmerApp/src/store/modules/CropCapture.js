import apollo from '@/apollo'
import gql from 'graphql-tag'
import upsertToPouch from '@/helpers/upsertToPouch'
import db from '@/api/pouchDB'
import moment from 'moment'

const state = {
    vegOptions: null,
    crops: []
}

const getters = {
    vegOptions(state) {
        return state.vegOptions
    },
    crops(state) {
        return state.crops
    },
}

const actions = {
    async getCropNames({
        state
    }) {
        const response = await apollo.query({
            query: gql `
                query produceList {
                    produceList {
                        name
                        type
                        spacing
                        plantsPerM
                        group {
                            name
                        }
                    }
                }
            `
        })
        state.vegOptions = response.data.produceList
        console.log('TCL: state.vegOptions', state.vegOptions);
    },
    async saveCrop({
        state,
        rootState,
        dispatch
    }, payload) {
        console.log('TCL: payload', payload);
        var farmState = rootState.AppState.docs.farm
        console.log('TCL: farmState', { ...farmState
        });

        const response = await apollo.mutate({
            mutation: gql `
                mutation createCrop(
                    $farmId: ID!
                    $category: CropCategory!
                    $name: String!
                    $description: String!
                    $spacing: String!
                    $squareMeters: String!
                    $harvestWindow: DateTime!
                    $imageSrc: String!
                    $imageName: String!



 

                ) {
                    createCrop(
                        category: $category name: $name description: $description spacing: $spacing squareMeters: $squareMeters harvestWindow: $harvestWindow imageSrc: $imageSrc imageName: $imageName farmId: $farmId
                    ) {
                        id
                        category
                        description
                        spacing
                        squareMeters
                        harvestWindow {
                            from
                            to
                        }
                        name
                        farm {
                            id
                            name
                        }
                        imageSrc
                    }
                }
            `,
            variables: {
                farmId: farmState.id,
                ...payload,

            }
        })

        console.log('TCL: response', response.data.createCrop);
        const docName = "crop/" + response.data.createCrop.id
        delete response.data.createCrop.__typename
        upsertToPouch(docName, response.data.createCrop)
        dispatch('fetchCrops')
    },

    async fetchCrops({
        rootState,
        state
    }) {
        var response = await apollo.query({
            query: gql `
            query currentCrops($farmId: ID!, $today: DateTime!) {
                currentCrops(
                    farmId: $farmId today: $today
                ) {
                    id
                    category
                    name
                    description
                    spacing
                    squareMeters
                    harvestWindow {
                        from
                        to
                    }
                    farm {
                        id
                        name
                    }
                    imageSrc

                }
            }
            `,
            variables: {
                farmId: rootState.AppState.docs.farm.id,
                today: moment()
            }
        })
        var crops = response.data.currentCrops
        console.log('TCL: crops', crops);

        state.crops = crops

    }
}

export default {
    state,
    getters,
    actions
}