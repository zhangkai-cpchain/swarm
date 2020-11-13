import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken (id = TokenKey) {
  return Cookies.remove(id)
}
export function setUserId (id) {
  localStorage.setItem('id', id)
}

export function getUserId () {
  return localStorage.getItem('id')
}
