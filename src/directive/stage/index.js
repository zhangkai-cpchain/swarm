import stage from './stage'

const install = function (Vue) {
  Vue.directive('stage', stage)
}

if (window.Vue) {
  window['stage'] = stage
  Vue.use(install); // eslint-disable-line
}

stage.install = install
export default stage
