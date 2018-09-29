import apollo from '@/main.js'
import {
    ME_QUERY
} from '@/graphql/queries'
import db from '@/api/pouchDB'
import gql from 'graphql-tag'

// import { idDataExtraction } from '@/helpers/idDataExtraction'

// var zaId = "7701025046083"
// console.log('TCL: -----------');
// console.log('TCL: zaId', zaId);
// console.log('TCL: -----------');
// idDataExtraction(zaId)


function upsertToPouch(docName, data) {
    db.upsert(docName, function (doc) {
        doc = { ...data
        }
        return doc;
    }).then(function (res) {
        console.log('TCL: -------------');
        console.log('TCL: res', res);
        console.log('TCL: -------------');
        // success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
    }).catch(function (err) {
        console.log('TCL: -------------');
        console.log('TCL: err', err);
        console.log('TCL: -------------');
        // error
    });
}

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
        delete farmingActivities.selling
        if (typeof farmingActivities.description !== "undefined") {
            delete farmingActivities.description
        }
        console.log('TCL: farmingActivities', farmingActivities);


        const response = await apollo.mutate({
            mutation: gql `
                mutation updateStableInfo(
                    $personalDetails: PersonalDetailsCreateWithoutPersonInput!,
                    $address: AddressCreateWithoutResidentInput!,
                    $farmingActivities: FarmingActivitiesCreateWithoutFarmerInput!
                ) {
                    updateStableInfo(
                            personalDetails: $personalDetails

                            address: $address

                            farmingActivities: $farmingActivities

                        ) {
                            address {
                                line1
                                line2
                                line3
                            }
                            mainActivities {
                                category
                            }
                            profile {
                                idSA
                            }
                    }
                }
            `,
            variables: {
                personalDetails,
                address,
                farmingActivities
            }
        })
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
    farmingActivities({
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