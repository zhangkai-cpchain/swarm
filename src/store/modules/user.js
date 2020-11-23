import { login } from '@/api/user'
import { removeToken, setUserId, setRoleId } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  id: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: '',
  permissions: []
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  setRole({ commit }, role) {
    commit('SET_ROLES', role)
    setRoleId(role)
  },
  setID({ commit }, id) {
    commit('SET_ID', id)
    setUserId(id)
  },
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        response.id && commit('SET_ID', response.id)
        response.id && setUserId(response.id)
        console.log(response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {

    })
  },

  // user logout
  // logout ({ commit, state, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_ID', '')
  //       commit('SET_ROLES', [])
  //       removeToken('JSESSIONID')
  //       resetRouter()

  //       // reset visited views and cached views
  //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //       dispatch('tagsView/delAllViews', null, { root: true })
  //       location.href = '#/home'
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }

  // dynamically modify permissions

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
