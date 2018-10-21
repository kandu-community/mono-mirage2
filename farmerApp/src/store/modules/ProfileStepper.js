import apollo from '@/apollo'
import {
    ME_QUERY,
} from '@/graphql/queries'
import {
    FARMINGACTIVITIES_MUTATION
} from '@/graphql/mutations'

import gql from 'graphql-tag'
import upsertToPouch from '@/helpers/upsertToPouch'

const state = {
    personalDetails: null,
    address: null,
    farmingActivities: null,
    element: 1,
    draftDone: false,
    profileIsOnline: false,
}

const getters = {
    element(state) {
        return state.element
    },
    stepperData(state) {
        return state
    },
    personalDetails(state) {
        return state.personalDetails
    },
    address(state) {
        return state.address
    },
    farmingActivities(state) {
        return state.farmingActivities
    },
    draftDone(state) {
        return state.draftDone
    }
}

const actions = {

    async sendProfile({
        state
    }) {

        function prepareForPrisma(dbObj) { // function that removes _id and _revision from objects I want to send to prisma
            delete dbObj._id
            delete dbObj._rev
            return dbObj
        }

        var combo = {
            ...state.personalDetails,
            ...state.address,
            ...state.farmingActivities
        }
        console.log('TCL: combo', combo);

        const response = await apollo.mutate({
            mutation: gql `
            mutation updateStableInfo(
                    $cell: String!
                    $idSA: String!
                    $landLine: String!
                    $lastName: String!
                    $addArea: String!
                    $addOne: String!
                    $addTwo: String!
                    $addThree: String!
                    $postalCode: String!
                    $province: String!
                    $farmingCategory: String!
                    $farmingDescription: String!
                    $farmingApproach: String!
                    $sellingCrops: Boolean!
                    $sellingProducts: Boolean!
                    $sellingLivestock: Boolean!
            ) {
              updateStableInfo(
                                      cell: $cell
                                      idSA: $idSA
                                      landLine: $landLine
                                      lastName: $lastName
                                      addArea: $addArea
                                      addOne: $addOne
                                      addTwo: $addTwo
                                      addThree: $addThree
                                      postalCode: $postalCode
                                      province: $province
                                      farmingCategory: $farmingCategory
                                      farmingDescription: $farmingDescription
                                      farmingApproach: $farmingApproach
                                      sellingCrops: $sellingCrops
                                      sellingProducts: $sellingProducts
                                      sellingLivestock: $sellingLivestock
              ) {
                  email
                  personalDetails {
                      cell
                  }
                  address {
                      line1
                  }
                  farmingActivities {
                      category
                      shortDescription
                      cultivationApproach
                      selling {
                          crops
                          livestock
                          products
                      }
                  }
              }
            }
          `,
            variables: {
                cell: combo.cell,
                idSA: combo.idSA,
                landLine: combo.landLine,
                lastName: combo.lastName,
                addArea: combo.area,
                addOne: combo.line1,
                addTwo: combo.line2,
                addThree: combo.line3,
                postalCode: combo.postalCode,
                province: combo.province,
                farmingCategory: combo.category,
                farmingDescription: combo.shortDescription,
                farmingApproach: combo.cultivationApproach,
                sellingCrops: combo.selling.crops,
                sellingProducts: combo.selling.products,
                sellingLivestock: combo.selling.livestock
            }
        });
        const data = await response.data
        console.log('TCL: data', data);
    },

    draftDone({
        state
    }, bool) {
        state.draftDone = bool
        console.log('TCL: ---------------------------------------');
        console.log('TCL: state.draftDone', state.draftDone);
        console.log('TCL: ---------------------------------------');
    },

    dbProfile({
        state
    }, payload) {
        console.log('action successfully dispatched', payload)
        state.address = payload.address
        state.personalDetails = payload.personalDetails
        state.farmingActivities = payload.farmingActivities
        //state.personalDetails.id
    },

    changeElement({
        state
    }, payload) {
        state.element = payload
    },

    personalDetails({
        state
    }, payload) {
        console.log('TCL: ---------------------');
        console.log('TCL: personalDetails', payload);
        console.log('TCL: ---------------------');
        var docName = "personalDetails"
        upsertToPouch(docName, payload)
    },

    address({
        state
    }, payload) {
        var docName = "address"
        upsertToPouch(docName, payload)
    },

    async farmingActivities({
        state
    }, payload) {
        var docName = "farmingActivities";
        console.log(`farmingActivities has: ${payload}`)
        upsertToPouch(docName, payload);
    },

    async fetchMe({
        state
    }) {
        const response = await apollo.query({ // The way to speak to gql database from vuex
            query: ME_QUERY
        })
        console.log('TCL: response', response);
    }
}

export default {
    state,
    getters,
    actions
}