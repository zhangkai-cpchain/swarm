import request from '@/utils/request-fetch'

export function getPermissions () {
  return request.get({
    url: 'roles/permissions?limit=999&page=0',
    method: 'get'
  })
}

export function getRoles () {
  return request.get({
    url: 'roles/?limit=999&page=0',
    method: 'get'
  })
}

export function addRole (data) {
  return request.post({
    url: 'roles/add',
    method: 'post',
    data
  })
}

export function updateRole (id, data) {
  return request.patch({
    url: `roles/update/${id}`,
    method: 'patch',
    data
  })
}

export function deleteRole (id) {
  return request.delete({
    url: `roles/delete/${id}`,
    method: 'delete'
  })
}
