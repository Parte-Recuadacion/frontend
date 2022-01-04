export const state = () => ({
  province: null
})

export const mutations = {
  update(state, name) {
    state.province = name
  }
}
export const getters = {
  get: state => {
    return state.province
  }
}
