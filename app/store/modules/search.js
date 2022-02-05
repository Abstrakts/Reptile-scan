export default {
    namespaced: true,
    state: {
        searchbar: false
    },
    getters: {
        getBarState: state => state.searchbar
    },
    actions: {
        setBarState(store, bool) {
            store.commit('SET_BAR', bool)
        }
    },
    mutations: {
        SET_BAR(state, bool) {
            state.searchbar = bool
        }
    }
}