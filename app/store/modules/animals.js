import axios from 'axios/dist/axios'

export default {
  namespaced: true,
  state: {
    animals: [],
  },
  getters: {
    getAnimals: (state) => state.animals,
  },
  actions: {
    async setAnimals(store) {
      const result = await axios.get(
        '/api/user/me/animals',
      )
      if (result.status === 200) {
        const animals = result.data
        store.commit('SET_ANIMALS', animals)
      }
    },
    async addAnimal(store, animal) {
      const result = await axios.post(
        '/api/user/me/animal/new',
        {
          name: animal.name,
          species: animal.species,
          morph: animal.morph,
          comment: animal.comment,
          sexe: animal.sexe,
          birthday: animal.birthday,
          picture: animal.imageSrc,
          category: animal.category
        }
			)
      if (result.status === 200) {
        store.commit('ADD_ANIMAL', animal)
      }
      return result
    },
  },
  mutations: {
    SET_ANIMALS(state, animals) {
      state.animals = animals
    },
    ADD_ANIMAL(state, animal) {
      state.animals.push(animal)
    },
  },
}
