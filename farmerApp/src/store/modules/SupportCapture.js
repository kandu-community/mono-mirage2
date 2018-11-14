import apollo from '@/apollo'
import gql from 'graphql-tag'

const state = {
    support: null
}

const getters = {
    support(state) {
        return state.support
    }
}

const actions = {
    async saveSupport({
        rootState,
        state
    }, payload) {
        console.log('TCL: payload', JSON.stringify(payload));
        var farmState = rootState.AppState.docs.farm
        const response = await apollo.mutate({
            mutation: gql `
                mutation createSupport(
                    $farmId: ID!
                    $date: DateTime!
                    $challenge: String!
                    $challengetype: String
                    $escalation: String
                    $description: String
                    $resolve: String
                    $notes: String
                    $image1Src: String
                    $image1Name: String
                    $image2Src: String
                    $image2Name: String

                ) {
                    createSupport(

                        farmId: $farmId
                        date: $date
                        challenge: $challenge
                        challengetype: $challengetype
                        escalation: $escalation
                        description: $description
                        resolve: $resolve
                        notes: $notes
                        image1Src: $image1Src
                        image1Name: $image1Name
                        image2Src: $image2Src
                        image2Name: $image2Name


        
                    ) {
                        id
                        date
                        challenge
                        challengetype
                        escalation
                        description
                        resolve
                        notes
                        image1Src
                        image1Name
                        image2Src
                        image2Name
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