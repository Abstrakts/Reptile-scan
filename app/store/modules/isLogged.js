export default {
    namespaced: true,
    state: {
        idToken: '',
        jwtToken: ''
    },
    getters: {
        getIdToken: state => state.idToken,
        getJwtToken: state => state.jwtToken
    },
    actions: {
        setIdToken(store, string) {
            store.commit('SET_TOKEN', string)
        },
        setJwtToken(store, string) {
            store.commit('SET_JWT', string)
        }
    },
    mutations: {
        SET_TOKEN(state, string) {
            state.idToken = string
        },
        SET_JWT(state, string) {
            state.jwtToken = string
        }
    }
}