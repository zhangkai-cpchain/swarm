import axios from 'axios'
import { Message } from 'element-ui'
import { setUserId } from './auth'
// import { getToken } from '@/utils/auth'
axios.defaults.withCredentials = true
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { data } = response
    // if the custom code is not 20000, it is judged as an error.
    if (data.code && data.message) {
      Message({
        message: data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(data.message || 'Error'))
    } else {
      return data
    }
  },
  error => {
    console.log('err:' + error) // for debug
    const res = error.data
    if (error.toString().includes('401')) {
      console.log('clear id')
      setUserId('')
    }
    if (res && res.code && res.message) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
