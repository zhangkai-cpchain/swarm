import store from '@/store'

function checkPermission (el, binding) {
  const { value } = binding
  const permissions = store.getters && store.getters.permissions
  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = permissions.some(p => {
        return permissionRoles.includes(p.name)
      })
      if (!hasPermission) {
        el.disabled = true
        el.className = el.className + ' is-disabled'
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted (el, binding) {
    checkPermission(el, binding)
  },
  update (el, binding) {
    checkPermission(el, binding)
  }
}
