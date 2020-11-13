function checkStage (el, binding) {
  const { value } = binding

  if (value > process.env.VUE_APP_STAGE) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

export default {
  inserted (el, binding) {
    checkStage(el, binding)
  },
  update (el, binding) {
    checkStage(el, binding)
  }
}
