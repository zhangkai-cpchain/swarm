import request from '@/utils/request-fetch'
export function createTask (data) {
  return request.post({
    url: 'data/createTask',
    data
  })
}

export function checkTask (data) {
  return request.post({
    url: 'data/checkTask',
    data
  })
}

export function listMachines () {
  return request.post({
    url: 'data/machineMonitor'
  })
}
// {
//   "machineId": "ss"
// }
export function machineDetail (data) {
  return request.post({
    url: 'data/machineDetail',
    data
  })
}

// {
//   "machineId": "ss",
//   "sensorType": "color"
// }
export function sensorValue (data) {
  return request.post({
    url: 'data/sensorValue',
    data
  })
}
export function warnings () {
  return request.post({
    url: 'data/warnings'
  })
}
export function warningDetail () {
  return request.post({
    url: 'data/warningDetail'
  })
}
export function warningOperatorDetail (data) {
  return request.post({
    url: 'data/warningOperatorDetail',
    data
  })
}
export function warningMachineDetail (data) {
  return request.post({
    url: 'data/warningMachineDetail',
    data
  })
}
export function cleanWarning (data) {
  return request.post({
    url: 'data/clearWarning',
    data
  })
}
export function machineMonitor () {
  return request.post({
    url: 'data/machineMonitor'
  })
}
export function operatorMonitor () {
  return request.post({
    url: 'data/operatorMonitor'
  })
}
export function totalTask () {
  return request.post({
    url: 'data/totalTask'
  })
}
export function totalData () {
  return request.post({
    url: 'data/totalData'
  })
}
export function latestData () {
  return request.post({
    url: 'data/latestData'
  })
}

export function queryData (data) {
  return request.post({
    url: 'data/queryData',
    data
  })
}

export function banObject (data) {
  return request.post({
    url: 'data/banObject',
    data
  })
}

