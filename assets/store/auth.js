import store from './main';
import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: {
        isAuthenticated(state) {
            console.log(state, !!(state.token && state.user));
            return !!(state.token && state.user);
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async register(_, form) {
            store.commit('setLoading', true);
            return await axios.post('/register', form)
                .catch(e => {
                    console.error(e);
                })
                .finally(() => store.commit('setLoading', false));
        },
        async login({dispatch}, credentials) {
            store.commit('setLoading', true);
            let response = await axios.post('/login', credentials)
                .catch(e => {
                    console.log(e);
                })
                .finally(() => store.commit('setLoading', false));

            return dispatch('attempt', response.data.token);
        },
        async attempt({commit, state}, token) {
            if (token) {
                commit('setToken', token);
            }
            if (!state.token) {
                return;
            }

            try {
                let response = await axios.get('/profile');
                commit('setUser', JSON.parse(response.data));
            } catch (err) {
                commit('setUser', null);
                commit('setToken', null);
                console.log(err);
            }
        },
        logout({commit}) {
            store.commit('setLoading', true);
            localStorage.removeItem('token');
            commit('setUser', null);
            commit('setToken', null);
            store.commit('setLoading', false);
        }
    },
}