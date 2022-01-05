export const state = () => ({
  dpa: null,
  nombre: null,
  missingProvince: []
})

export const mutations = {
  updateDpa(state, dpa) {
    state.dpa = dpa
  },
  updateNombre(state, nombre) {
    state.nombre = nombre
  },
  updateMissingProvince(state, arrProvince) {
    state.missingProvince = arrProvince
  }
}
export const getters = {
  getName: state => {
    return state.nombre
  },
  getDpa: state => {
    return state.dpa
  },
  getProvince: state => {
    return state.missingProvince
  }
}
