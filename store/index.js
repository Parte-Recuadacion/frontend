export const state = () => ({
  dpa: null,
  nombre: null,
  index: null,
  missingProvince: [],
  selectedProvince: [],
  color: 'light',
  value: false,
  updated: false,
  isDarkModeActive: false,
  actualProvince: null,
  sendedInfo: false
})

export const mutations = {
  setSendedInfo(state, value) {
    state.sendedInfo = value
  },
  updateDpa(state, dpa) {
    state.dpa = dpa
  },
  updateNombre(state, nombre) {
    state.nombre = nombre
  },
  updateMissingProvince(state, arrProvince) {
    state.missingProvince = arrProvince
  },
  updateIndex(state, i) {
    state.index = i
  },
  deleteProvince(state, index) {
    state.missingProvince.splice(index, 1)
  },
  updateChosenProvince(state, index) {
    state.selectedProvince = []
    state.selectedProvince.push(Number(index))
  },
  updateColor(state, color) {
    state.color = color
  },
  updateDarkMode(state, value) {
    state.isDarkModeActive = value
  },
  updateValue(state, value) {
    state.value = value
  },
  setUpdated(state, value) {
    state.update = value
  },
  setActualProvince(state, value) {
    state.actualProvince = value
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
  },
  getIndex: state => {
    return state.index
  },
  getChosenProvince: state => {
    return state.selectedProvince
  },
  getColor: state => {
    return state.color
  },
  getValue: state => {
    return state.value
  },
  getUpdated: state => {
    return state.value
  },
  getDarkMode: state => {
    return state.isDarkModeActive
  },
  getActualProvince: state => {
    return state.actualProvince
  },
  getSendedInfo: state => {
    return state.sendedInfo
  }
}
