import apollo from '@/apollo'
import gql from 'graphql-tag'

const state = {
    vegOptions: null
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
    }
}

export default {
    state,
    getters,
    actions
}