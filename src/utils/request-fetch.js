
// eslint-disable-next-line no-unused-vars
import { Message } from 'element-ui'
import qs from 'qs'
import { setUserId } from './auth'
class Instance {
  static getInstance () {
    if (!this.instance) {
      this.instance = new Instance()
    }
    return this.instance
  }

  put ({ url, data }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: (data ? JSON.stringify(data) : null)

    })
      .then(r => {
        return r.json()
      })
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
  patch ({ url, data }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'PATCH',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: (data ? JSON.stringify(data) : null)

    })
      .then(r => {
        return r.json()
      })
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
  delete ({ url }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(r => {
        if (r.status === 200) {
          return ''
        } else {
          return Promise.reject('操作失败')
        }
      })
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

  post ({ url, data }) {
    return fetch(process.env.VUE_APP_BASE_API + url, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: (data ? JSON.stringify(data) : null)

    })
      .then(r => {
        console.log(r)

        return Promise.all([r.json(), Promise.resolve(r.status)])
        // if (r.status === 200) {
        //   return Promise.resolve('success')
        // } else {
        //   return r.json()
        // }
      })
      .then(([r, s]) => {
        console.log(r, s)
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
  get ({ url, query }) {
    return fetch(process.env.VUE_APP_BASE_API + url + (query ? ('?' + qs.stringify(query)) : ''), {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }

    })
      .then(r => {
        return r.json()
      })
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

        console.log('clear id')
        setUserId('')
      })
  }
}

export default Instance.getInstance()
