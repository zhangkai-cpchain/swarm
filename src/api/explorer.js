import { machineMonitor } from './swarm'
import request from '@/utils/request-fetch'
export async function getDeviceList() {
  const { data } = await machineMonitor()
  let content = []
  if (data.normalMachines) { content = data.normalMachines }
  if (data.warningMachines) { content = [...content, ...data.normalMachines] }
  if (data.revokedMachines) {
    data.revokedMachines.map(e => {
      e.machineStatus = 'revoked'
    })
    content = [...content, ...data.revokedMachines]
  }

  return { content }
}

export async function getNodes() {
  return request.post({
    url: 'data/getNode'
  })
}

export async function lastestBlocks() {
  return request.get({
    url: 'data/getLatestBlocks'
  })
}

export async function lastestTxs() {
  return request.get({
    url: 'data/getLatestTrxs'
  })
}

