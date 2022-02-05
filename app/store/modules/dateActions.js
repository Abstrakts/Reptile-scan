export default {
  namespaced: true,
  state: {
    date: new Date,
  },
  getters: {
    getDate: (state) => state.date,
  },
  actions: {
    formatDate(format) {
      let d = this.newDate.getDate()
      let m = this.newDate.getMonth() + 1
      let y = this.newDate.getFullYear()

      let day = d.toString()
      let month = m.toString()
      let year = y.toString()

      if (day.length === 1) day = `0${day}`
      if (month.length === 1) month = `0${month}`

      return [day, month, year].join('/')
    },
    setDate(store) {
        store.commit('SET_DATE', this.formatDate(new Date()))
    }
  },
  mutations: {
    SET_DATE(state, string) {
      state.date = string
    },
  },
}
