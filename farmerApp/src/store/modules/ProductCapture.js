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
                    $productype: String
                    $description: String
                    $unit: String
                    $stockLevel: Float
                    $price: Float
                    $imageSrc: String
                    $imageName: String
                    $imageSrctoo: String
                    $imageNametoo: String
                ) {
                    createProduct(
                        farmId: $farmId 
                        name: $name 
                        productype: $productype 
                        description: $description 
                        unit: $unit 
                        stockLevel: $stockLevel 
                        price: $price
                        imageSrc: $imageSrc
                        imageName: $imageName
                        imageSrctoo: $imageSrctoo
                        imageNametoo: $imageNametoo
        
                    ) {
                        id
                        name
                        productype
                        description
                        unit
                        stockLevel
                        price
                        imageSrc
                        imageName
                        imageSrctoo
                        imageNametoo
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