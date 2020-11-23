
// eslint-disable-next-line no-unused-vars
import { Message } from 'element-ui'
import qs from 'qs'
const resolveHttpCode = (r) => {
  switch (r.status) {
    case 500:
      return Promise.reject({ message: '服务器错误' })
    case 404:
      return Promise.reject({ message: '无效的请求地址' })
    case 403:
      return Promise.reject({ message: '权限不足' })
    case 401:
      return Promise.reject({ message: '权限不足' })
    default:
      return r.json()
  }
}

class Instance {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Instance()
    }
    return this.instance
  }

  put({ url, data }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: (data ? JSON.stringify(data) : null)

    })
      .then(resolveHttpCode)
      .then(r => {
        if (r.message) {
          return Promise.reject(r)
        } else {
          return r
        }
      }).catch(err => {
        Message({
          message: err.message || err.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      })
  }
  patch({ url, data }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'PATCH',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: (data ? JSON.stringify(data) : null)

    })
      .then(resolveHttpCode)
      .then(r => {
        if (r.message) {
          return Promise.reject(r)
        } else {
          return r
        }
      }).catch(err => {
        Message({
          message: err.message || err.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      })
  }
  delete({ url }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(resolveHttpCode)
      .then(r => {
        console.log(r)
        if (r.message) {
          return Promise.reject(r)
        } else {
          return r
        }
      }).catch(err => {
        Message({
          message: err.message || err.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      })
  }
  postForm({ url, formdata }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'POST',
      // credentials: 'include',
      // mode: 'cors',
      // headers: {
      //   'Content-Type': 'application/json;charset=UTF-8'
      // },
      body: formdata
    })
      .then(resolveHttpCode)
      .then(r => {
        if (r.message) {
          return Promise.reject(r)
        } else {
          return r
        }
      }).catch(err => {
        Message({
          message: err.message || err.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      })
  }

  post({ url, data }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: (data ? JSON.stringify(data) : null)

    })
      .then(resolveHttpCode)
      .then((r) => {
        if (r.message) {
          return Promise.reject(r)
        } else {
          return r
        }
      }).catch(err => {
        Message({
          message: err.message || err.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      })
  }
  get({ url, query }) {
    return fetch(process.env.VUE_APP_BASE_API + url + (query ? ('?' + qs.stringify(query)) : ''), {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }

    })
      .then(resolveHttpCode)
      .then(r => {
        if (r.message) {
          return Promise.reject(r)
        } else {
          return r
        }
      }).catch(err => {
        Message({
          message: err.message || err.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      })
  }
}

export default Instance.getInstance()
