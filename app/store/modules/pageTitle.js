function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
    namespaced: true,
    state: {
        pageTitle: ''
    },
    getters: {
        getLangState: state => state.pageTitle
    },
    actions: {
        setLangState(store, lang) {
            store.commit('SET_LANG', lang)
        }
    },
    mutations: {
        SET_LANG(state, lang) {
            state.pageTitle = capitalizeFirstLetter(lang)
        }
    }
}