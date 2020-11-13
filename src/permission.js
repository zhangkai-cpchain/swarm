import router from './router'
import store from './store'
router.beforeEach(async (to, from, next) => {
  const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin'])
  router.addRoutes(accessRoutes)
  next()
})

