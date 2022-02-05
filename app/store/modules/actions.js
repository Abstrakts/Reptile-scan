export default {
    namespaced: true,
    state: {
        qrcode: ''
    },
    getters: {
        getQrcode: state => state.qrcode
    },
    actions: {
        setQrcode(store, string) {
            store.commit('SET_QRCODE', string)
        }
    },
    mutations: {
        SET_QRCODE(state, string) {
            state.qrcode = string
        }
    }
}