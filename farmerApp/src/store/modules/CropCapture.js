import apollo from '@/apollo'
import gql from 'graphql-tag'

const state = {
    vegOptions: null,
    crops: []
}

const getters = {
    vegOptions(state) {
        return state.vegOptions
    }

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
        state
    }, payload) {
        console.log('TCL: payload', payload);
        // const response = await apollo.mutate({

        // })

    }
}

export default {
    state,
    getters,
    actions
}