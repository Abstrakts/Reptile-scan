import axios from 'axios/dist/axios'

export default {
  install(Vue) {
    const instance = axios.create({
      baseURL: 'https://sylviefeedessoins.fr',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    Vue.prototype.$axios = instance
  },
}
