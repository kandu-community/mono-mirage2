import apollo from '@/apollo'
import gql from 'graphql-tag'

const state = {
    distributor: null
}

const getters = {
    distributor(state) {
        return state.distributor
    }
}

const actions = {
    async saveDistributor({
        rootState,
        state
    }, payload) {
        console.log('TCL: payload', JSON.stringify(payload));
        var farmState = rootState.AppState.docs.farm
        const response = await apollo.mutate({
            mutation: gql `
                mutation createDistributor(
                    $farmId: ID!
                    $name: String!
                    $phone: String
                    $ownerDriver: String
                    $vehicleMake: String
                    $vehicleType: String
                    $registration: String
                    $description: String
                    $roadworthy: String
                    $driverLicense: String
                    $vehicleLicense: String
                    $imaSrc: String
                    $imaName: String
                    $imaSrctoo: String
                    $imaNametoo: String
                ) {
                    createdistributor(
                        farmId: $farmId 
                        name: $name
                        phone: $phone
                        ownerDriver: $ownerDriver
                        vehicleMake: $vehicleMake
                        vehicleType: $vehicleType
                        registration: $registration
                        description: $description
                        roadworthy: $roadworthy
                        driverLicense: $driverLicense
                        vehicleLicense: $vehicleLicense
                        imaSrc: $imaSrc
                        imaName: $imaName
                        imaSrctoo: $imaSrctoo
                        imaNametoo: $imaNametoo

                    ) {
                        id
                        name
                        phone
                        ownerDriver
                        vehicleMake
                        vehicleType
                        registration
                        description
                        roadworthy
                        driverLicense
                        vehicleLicense
                        imaSrc
                        imaName
                        imaSrctoo
                        imaNametoo
                        farm {
                            id
                        }
                    }
                }
            `,
            variables: {
                farmId: farmState.id,
                ...payload,

            }
        })
        console.log('TCL: response', response);
    }
}

export default {
    state,
    getters,
    actions
}