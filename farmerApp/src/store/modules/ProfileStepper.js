import apollo from '@/main.js'
import {
    ME_QUERY
} from '@/graphql/queries'
import db from '@/api/pouchDB'

function upsertToPouch(docName, data){
    db.upsert(docName, function (doc) {
        doc = {...data}
        if (!doc.count) {
            doc.count = 0;
        }
        doc.count++;
        doc.isOnline = false
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
    element: 1,
    gotPersonalDetails: false,
    gotAddress: false,
    gotFarmingActivities: false,
    // me: null
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
    personalDetails({
        state
    }, payload) {
        var docName = "personalDetails"
        upsertToPouch(docName, payload)
        state.gotPersonalDetails = true
    },
    address({
        state
    }, payload) {
        var docName = "address"
        upsertToPouch(docName, payload)
        state.gotAddress = true
    },
    farmingActivities({
        state
    }, payload) {
        var docName = "farmingActivities";
        upsertToPouch(docName, payload);
        state.gotFarmingActivities = true
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