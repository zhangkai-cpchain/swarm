import request from '@/utils/request-fetch'
export function createTask (data) {
  return request.post({
    url: 'api/data/createTask',
    data
  })
}

export function checkTask (data) {
  return request.post({
    url: 'api/data/checkTask',
    data
  })
}

