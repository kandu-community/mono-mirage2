import apolloClient from "@/main.js";
import { ME_QUERY } from "@/graphql/queries";

const state = {
  isOnline: false,
  me: null
};

const getters = {
  isOnline(state) {
    return state.isOnline;
  }
};

const actions = {
    isOnline({ state }, payload) {
        state.isOnline = payload;
        console.log('TCL: -----------------------------------------------');
        console.log('TCL: isOnline -> state.isOnline', state.isOnline);
        console.log('TCL: -----------------------------------------------');
  },
};

export default {
  state,
  getters,
  actions
};
