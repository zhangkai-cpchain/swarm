import request from '@/utils/request-fetch'

export function getBlockList (query) {
  return request.get({
    url: 'chain/blocks',
    method: 'get',
    params: query, query
  })
}

export function getDashboard () {
  return request.get({
    url: 'api/dashboard',
    method: 'get'
  })
}

export function getTxList (query) {
  return request.get({
    url: 'chain/txs',
    method: 'get',
    params: query, query
  })
}

