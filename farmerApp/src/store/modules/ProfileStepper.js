import apolloClient from '@/main.js'
import {
    ME_QUERY
} from '@/graphql/queries'

const state = {
    element: 1,
    me: null
}

const getters = {
    element(state) {
        return state.element
    },
}

const actions = {
    changeElement({
        state
    }, payload) {
        state.element = payload
    },
    async fetchMe({
        state
    }) {
        const response = await apolloClient.query({
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