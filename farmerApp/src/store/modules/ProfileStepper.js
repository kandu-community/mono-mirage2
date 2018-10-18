import apollo from '@/apollo'
import {
    ME_QUERY,
} from '@/graphql/queries'
import {
    FARMINGACTIVITIES_MUTATION
} from '@/graphql/mutations'

import gql from 'graphql-tag'
import upsertToPouch from '@/helpers/upsertToPouch'
// import { idDataExtraction } from '@/helpers/idDataExtraction'

// var zaId = "7701025046083"
// console.log('TCL: -----------');
// console.log('TCL: zaId', zaId);
// console.log('TCL: -----------');
// idDataExtraction(zaId)



const state = {
    personalDetails: null,
    address: null,
    farmingActivities: null,
    element: 1,
    draftDone: false,
    profileIsOnline: false,
    // me: null
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

/**
 * paula @p.com

 Password

personalDetails
cell: $cell,
idSA: $idSA,
isOnline: $isOnline,
landLine: $landLine,
lastName: $lastName

  $cell: String,
      $idSA: String,
      $isOnline: String,
      $landLine: String,
      $lastName: String

  $cellNo: String,
      $idSA: String,
      $landLine: String,
      $lastName: String


      {
          cellNo: $cellNo,
          idSA: $idSA,
          landLine: $landLine,
          lastName: $lastName
      }

      SO THIS IS HOW YOU MAKE A MUTATION WITH MULTIPLE THINGYS
      mutation($personalDetails: PersonalDetailsCreateWithoutPersonInput!, $address: AddressCreateWithoutResidentInput!) {
          updateUser(data: {
                  personalDetails: {
                      create: $personalDetails
                  }
                  address: {
                      create: $address
                  }
              },
              where: {
                  email: "dylan@vandenbosch.co.za"
              }) {
              role
              email
          }
      }
 */

const actions = {
    /**
        async fetchMe({
            state
        }) {
            const response = await apollo.query({ // The way to speak to gql database from vuex
                query: ME_QUERY
            })
            console.log('TCL: response', response);
        }
     */

    /**


     */
    async sendProfile({
        state
    }) {
        // : state.personalDetails: state.address: state.farmingActivities

        function prepareForPrisma(dbObj) { // function that removes _id and _revision from objects I want to send to prisma
            delete dbObj._id
            delete dbObj._rev
            return dbObj
        }

        var personalDetails = prepareForPrisma(state.personalDetails)
        console.log('TCL: personalDetails', personalDetails);
        var address = prepareForPrisma(state.address)
        console.log('TCL: address', address);
        var farmingActivities = prepareForPrisma(state.farmingActivities)
        // delete farmingActivities.selling
        if (typeof farmingActivities.description !== "undefined") {
            delete farmingActivities.description
        }
        var selling1 = {
            upsert: {
                create: farmingActivities.selling,
                update: farmingActivities.selling
            }
        }

        var selling2 = {
            create: farmingActivities.selling,
        }

        var farmingActivities1 = farmingActivities
        farmingActivities1.selling = selling1
        console.log('TCL: selling1', selling1);
        console.log('TCL: farmingActivities1', farmingActivities1);


        var farmingActivities2 = farmingActivities
        farmingActivities2.selling = selling2


        const response = await apollo.mutate({
            mutation: gql `
            mutation updateStableInfo($personalDetails1: PersonalDetailsUpdateWithoutPersonDataInput!, $personalDetails2: PersonalDetailsCreateWithoutPersonInput!, $farmingActivities1: FarmingActivitiesUpdateWithoutFarmerDataInput!, $farmingActivities2: FarmingActivitiesCreateWithoutFarmerInput!, $address1: AddressUpdateWithoutResidentDataInput!, $address2: AddressCreateWithoutResidentInput!) {
              updateStableInfo(personalDetails1: $personalDetails1, personalDetails2: $personalDetails2, farmingActivities1: $farmingActivities1, farmingActivities2: $farmingActivities2, address1: $address1, address2: $address2) {
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
                personalDetails1: personalDetails,
                address1: address,
                farmingActivities1,
                personalDetails2: personalDetails,
                address2: address,
                farmingActivities2
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