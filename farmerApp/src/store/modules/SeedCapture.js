import apollo from '@/apollo'
import gql from 'graphql-tag'
import upsertToPouch from '@/helpers/upsertToPouch'
import db from '@/api/pouchDB'
import moment from 'moment'

const state = {
    vegOptions: null,
    seeds: []
}

const getters = {
    vegOptions(state) {
        return state.vegOptions
    },
    seeds(state) {
        return state.seeds
    },
}

const actions = {
    async getSeedNames({
        state
    }) {
        const response = await apollo.query({
            query: gql `
                query seedList {
                    seedList {
                        category
                        name
                        description
                        unit
                        stockLevel
                        price
                        harvestDate
                    }
                }
            `
        })
        state.vegOptions = response.data.seedList
        console.log('TCL: state.vegOptions', state.vegOptions);
    },
    async saveSeed({
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
                mutation createSeed(
                    $farmId: ID!
                    $category: SeedCategory!
                    $name: String!
                    $description: String!
                    $unit: String!
                    $stockLevel: String!
                    $price: String!
                    $harvestDate: DateTime!

                ) {
                    createSeed(
                        category: $category name: $name description: $description unit: $unit stockLevel: $stockLevel price: $price harvestDate: $harvestDate farmId: $farmId
                    ) {
                        id
                        category
                        name
                        description
                        unit
                        stockLevel
                        price
                        harvestDate
                        farm {
                            id
                            name
                        }
                    }
                }
            `,
            variables: {
                farmId: farmState.id,
                ...payload,

            }
        })

        console.log('TCL: response', response.data.createSeed);
        const docName = "seed/" + response.data.createSeed.id
        delete response.data.createSeed.__typename
        upsertToPouch(docName, response.data.createSeed)
        dispatch('fetchSeeds')
    },

    async fetchSeeds({
        rootState,
        state
    }) {
        var response = await apollo.query({
            query: gql `
            query currentSeeds($farmId: ID!, $today: DateTime!) {
                currentSeeds(
                    farmId: $farmId today: $today
                ) {
                    id
                    category
                    name
                    description
                    unit
                    stockLevel
                    price
                    harvestDate
                    farm {
                        id
                        name
                    }

                }
            }
            `,
            variables: {
                farmId: rootState.AppState.docs.farm.id,
                today: moment()
            }
        })
        var seeds = response.data.currentSeeds
        console.log('TCL: seeds', seeds);

        state.seeds = seeds

    }
}

export default {
    state,
    getters,
    actions
}