import Vue from 'vue';
import Vuex from 'vuex';
import auth from '../store/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false
    },
    getters: {
        getLoading(state) {
            return state.isLoading
        }
    },
    mutations: {
        setLoading(state, newState) {
            state.isLoading = newState;
        }
    },
    actions: {

    },
    modules: {
        auth
    }
});