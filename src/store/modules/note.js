export default {
  state: {
    predefineColors: [
      "#fff",
      "#F9EBEA",
      "#EBDEF0",
      "#A9CCE3",
      "#A3E4D7",
      "#F9E79F",
    ],
  },
  getters: {
    predefineColors(state) {
      return state.predefineColors
    }
  },
}