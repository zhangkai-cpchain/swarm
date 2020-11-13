// import request from '@/utils/request'
import instance from '@/utils/request-fetch'
export function signIn (data) {
  return instance.post({
    url: 'api/data/signin',
    data
  })
}

export function getNonceAndKeystore (data) {
  return instance.post({
    url: 'api/data/getNonceAndKeystore',
    data
  })
}
export function getNonce (data) {
  return instance.post({
    url: 'api/data/getNonce',
    data
  })
}

export function register (data) {
  return instance.post({
    url: 'api/data/signup',
    data
  })
}
export function getConfig () {
  return instance.get({
    url: 'api/configs'
  })
}
export function login (data) {
  return instance.post({
    url: 'api/login',
    method: 'post',
    data
  })
}

export function getInfo (id) {
  return instance.get({
    url: 'users/' + id
  })
}

export function logout () {
  return instance.post({
    url: 'api/logout',
    method: 'post'
  })
}

export function getUsers () {
  return instance.get({
    url: 'users/?limit=999&page=0',
    method: 'get'
  })
}
export function addUser (data) {
  return instance.post({
    url: 'users/add',
    method: 'post',
    data
  })
}

export function resetPassword (id, data) {
  return instance.patch({
    url: `/users/password/reset/${id}`,
    method: 'patch',
    data
  })
}

export function changePassword (data) {
  return instance.patch({
    url: `/users/password/update`,
    method: 'patch',
    data
  })
}

export function updateUserRole (id, data) {
  return instance.patch({
    url: `/users/role/update/${id}`,
    method: 'patch',
    data
  })
}

export function deleteUser (id) {
  return instance.delete({
    url: `users/delete/${id}`,
    method: 'delete'
  })
}
