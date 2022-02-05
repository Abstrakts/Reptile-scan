import axios from 'axios/dist/axios'

export default {
  namespaced: true,
  state: {
    user: [],
  },
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async setUser(store) {
        const result = await axios.get(
            '/api/user/me'
        )
        if (result.status === 200) {
            const user = result.data
            store.commit('SET_USER', user)
        }
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
  },
}
