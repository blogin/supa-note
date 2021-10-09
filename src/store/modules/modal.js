export default {
  state: {
    showModal: false,
  },
  getters: {
    showModal(state) {
      return state.showModal
    }
  },
  mutations: {
    setShowModal(state, payload) {
      state.showModal = payload
    }
  }
}