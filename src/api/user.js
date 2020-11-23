// import request from '@/utils/request'
import instance from '@/utils/request-fetch'
export function signIn(data) {
  return instance.post({
    url: 'data/signin',
    data
  })
}

export function getNonceAndKeystore(data) {
  return Promise.all([
    instance.post({
      url: 'data/getNonce',
      data
    }),
    instance.post({
      url: 'data/getKeyStore',
      data
    })
  ])
}
export function getNonce(data) {
  return instance.post({
    url: 'data/getNonce',
    data
  })
}

export function register(formdata) {
  return instance.postForm({
    url: 'data/signup',
    formdata
  })
}
export function getConfig() {
  return instance.get({
    url: 'configs'
  })
}
export function login(data) {
  return instance.post({
    url: 'login',
    method: 'post',
    data
  })
}

export function personalInfo(data) {
  return instance.post({
    url: 'data/personalInfo',
    data
  })
}

export function warningDetail(data) {
  return instance.post({
    url: 'data/warningDetail',
    data
  })
}
