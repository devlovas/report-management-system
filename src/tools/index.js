
function dialog (store, type, message) {
  type = type != 'success' ? (type != 'error' ? 3 : 2) : 1
  store.commit('dialog', [type, message])
}

export { dialog }
