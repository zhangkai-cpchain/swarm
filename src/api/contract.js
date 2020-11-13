import request from '@/utils/request-fetch'
export function getBlocksHourly () {
  return request.get({
    url: 'chain/blocks/group/hourly',
    method: 'get'
  })
}
export function getTxsHourly () {
  return request.get({
    url: 'chain/txs/group/hourly',
    method: 'get'
  })
}
export function getDataHourly () {
  return request.get({
    url: 'chain/bsim/data/group/hourly',
    method: 'get'
  })
}
export function getBlocksDaily () {
  return request.get({
    url: 'chain/blocks/group/daily',
    method: 'get'
  })
}
export function getTxsDaily () {
  return request.get({
    url: 'chain/txs/group/daily',
    method: 'get'
  })
}
export function getDataDaily () {
  return request.get({
    url: 'chain/bsim/data/group/daily',
    method: 'get'
  })
}

export function getNodes (query) {
  return request.get({
    url: 'api/nodes',
    method: 'get'
  })
}

export function getContractDataList (query) {
  return request.get({
    url: 'chain/bsim/data',
    method: 'get',
    params: query, query
  })
}

export function getContractEquipmentList (query) {
  return request.get({
    url: 'chain/bsim/basicInfo',
    method: 'get',
    params: query, query
  })
}
export function getContractDataFields () {
  return request.get({
    url: 'chain/bsim/data/fields',
    method: 'get'
  })
}

export function deleteTLV (id) {
  return request.delete({
    url: 'chain/bsim/data/fields/' + id
  })
}

export function putTLV (data) {
  return request.put({
    url: 'chain/bsim/data/fields/' + data.id,
    method: 'put',
    data
  })
}

export function postTLV (data) {
  return request.post({
    url: 'chain/bsim/data/fields',
    method: 'post',
    data
  })
}
