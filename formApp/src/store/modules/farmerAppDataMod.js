import apollo from '@/apollo'
import gql from 'graphql-tag'

const state = {
    vegMetadata: null,
    vegOptions: null
}

const getters = {
    vegMetadata(state) {
        return state.vegetablesMetadata
    },
    vegOptions(state) {
        return state.vegOptions
    }
}

const actions = {
    async vegMetadata({
        state
    }, payload) {

        var popped = payload.pop()
        console.log('TCL: popped', popped);

        const gqlFormat = payload.map(function (row) {
            return {
                name: row.Produce,
                type: row.ProduceType,
                spacing: Number(row["Spacing in mm"]),
                plantsPerM: Number(row.PlantsPerMetersSquared),
            }
        })
        console.log('TCL: gqlFormat', gqlFormat);

        const response = await apollo.mutate({
            mutation: gql `
            mutation createProduceTable($name: String, $produce: _ProduceCreateManyWithoutGroupInput!) {
                create_ProduceTable(name: $name, objArray: $produce) {
                    name
                    produce {
                        name
                    }
                }
            }
            `,
            variables: {
                name: "baseTable",
                produce: {
                    create: gqlFormat
                }
            }
        })
        console.log('TCL: response', response);
    },
    async showVegOptions({
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