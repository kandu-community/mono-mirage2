import apollo from '@/apollo'
import gql from 'graphql-tag'

const state = {
    product: null
}

const getters = {
    product(state) {
        return state.product
    }
}

const actions = {
    async saveProduct({
        rootState,
        state
    }, payload) {
        console.log('TCL: payload', JSON.stringify(payload));
        var farmState = rootState.AppState.docs.farm
        const response = await apollo.mutate({
            mutation: gql `
                mutation createProduct(
                    $farmId: ID!
                    $name: String!
                    $description: String
                    $unit: String
                    $stockLevel: Float
                    $price: Float
                    $imageSrc: String
                    $imageName: String
                ) {
                    createProduct(
                        farmId: $farmId 
                        name: $name 
                        description: $description 
                        unit: $unit 
                        stockLevel: $stockLevel 
                        price: $price
                        imageSrc: $imageSrc
                        imageName: $imageName
        
                    ) {
                        id
                        name
                        description
                        unit
                        stockLevel
                        price
                        imageSrc
                        imageName
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