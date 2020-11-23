<template>
  <div class="r-main">
    <div class="block">
      <div class="row header">
        <p>节点运行</p>
      </div>
      <div class="row sub">
        <span class="co0">#</span>
        <span class="co1">节点</span>
        <span class="co3">状态</span>
      </div>
      <div class="items-node">
        <!-- <div v-for="(item,i) in orderers" :key="item.name" class="row">
          <span class="co0">{{ i+1 }}</span>
          <span class="co1">{{ item.name }}</span>
          <span class="co2">
            <el-tag
              :type="getStatusType('peer',item.status)"
              effect="dark"
            >{{ item.status | NodeStatus }}</el-tag>
          </span>
        </div> -->
        <div v-for="(item,i) in peers" :key="item.name" class="row">
          <span class="co0">{{ i +1 }}</span>
          <span class="co1">{{ item.org }}</span>
          <span class="co2">
            <el-tag :type="getStatusType('peer',item.status)" effect="dark">{{ item.status | NodeStatus }}</el-tag>
          </span>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="row header">
        <p>设备信息</p>
      </div>
      <div class="row sub">
        <span class="cl0">#</span>
        <span class="cl2">设备ID</span>
        <span class="cl2">设备类型</span>
        <span class="cl3">状态</span>
      </div>
      <div class="items-node">
        <div v-for="(item,i) in devices" :key="(i+item.machineId+item.time + 'mac')" class="row">
          <span class="cl0">{{ i +1 }}</span>
          <span class="cl1">{{ item.machineId }}</span>
          <span class="cl2">{{ item.type | devName }}</span>
          <span class="cl3">
            <el-tag :type="getStatusType('machine', item.machineStatus)" effect="dark">{{ item.machineStatus | machineStatus }}</el-tag>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getNodes } from '@/api/contract'
import { getDeviceList, getNodes } from '@/api/explorer'
import pump from '../data/pump'

import { heartBeat } from '../../../utils/variables'
import { interval } from 'rxjs'
import { intervalImmediately } from '../charts/rx'
import { retryWhen } from 'rxjs/operators'
export default {
  name: 'Center',
  data() {
    return {
      orderers: [],
      peers: [],
      devices: []
    }
  },
  created() {
    this.sub = intervalImmediately(heartBeat * 1000)
      .pipe(
        retryWhen(() => {
          return interval(heartBeat * 2 * 1000)
        })
      )
      .subscribe(() => {
        this.getNodes()
        this.getDevices()
      })
  },
  beforeDestroy() {
    // this.qingshuichi_output_water_ph.unsubscribe()
    if (this.sub) this.sub.unsubscribe()
  },
  methods: {
    getStatusType(cl, val) {
      if (cl === 'peer') {
        const obj = {
          RUNNING: '',
          UNREACHABLE: 'danger',
          running: '',
          'broken': 'danger'
        }
        return obj[val]
      }

      if (cl === 'device') {
        const obj = {
          UNREGISTERED: 'info',
          REGISTERED: '',
          OFFLINE: 'danger',
          NORMAL: ''
        }
        return obj[val]
      }

      if (cl === 'machine') {
        const obj = {
          0: 'success',
          1: 'warning',
          2: 'danger',
          revoked: 'info'
        }
        return obj[val]
      }
    },
    async getNodes() {
      const response = await getNodes()
      console.log(response)
      this.peers = response.data.nodes
      console.log(this.peers)
      // this.peers = [];
      // this.orderers = response.orderers;
      // response.organizations.forEach(organization => {
      //   this.peers = [...this.peers, ...organization.peers];
      //   console.log(this.peers);
      //   pump.peerCount.next(this.peers.length);
      // });
    },
    async getDevices() {
      const response = await getDeviceList({ limit: 999, page: 0 })
      this.devices = []
      response.content.forEach(e => {
        if (e.info) {
          for (const key in e.info) {
            e[key] = e.info[key]
          }
        }
      })
      this.devices = response.content
      pump.deviceCount.next(this.devices.length)
    }
  }
}
</script>
<style lang="scss" scoped>
.r-main {
  min-width: 360px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .block {
    height: 48%;
    overflow: hidden;
    margin: 10px 0;
    border: 2px solid rgba(5, 62, 108, 1);
    border-radius: 4px;
  }
}
.row {
  height: 48px;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  padding: 0 14px;
  display: flex;
  background-color: rgba(11, 27, 72, 1);
  border-bottom: 2px solid rgba(5, 62, 108, 1);
  color: rgba($color: #ffffff, $alpha: 1);

  span {
    // width: 50%;
    font-size: 14px;
    color: rgba($color: #ffffff, $alpha: 1);
    // text-align: center;
  }
}

.header {
  height: 60px !important;
  font-size: 18px;
  font-weight: 700;
}
.sub {
  font-size: 16px;
}

.items-node {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
  // background: rgba(8, 36, 83, 1);
  background-color: rgba(11, 27, 72, 1);
  height: 100%;
  overflow: scroll;
}

.co0 {
  width: 80px;
}
.co1 {
  width: 220px;
  text-align: left;
}
.co2 {
  width: 100px;
}

.cl0 {
  width: 50px;
}
.cl1 {
  width: 130px;
  text-align: left;
}
.cl2 {
  width: 120px;
}
.cl3 {
  width: 100px;
  text-align: center;
}

.el-tag--medium {
  width: 88px !important;
  height: 30px !important;
  text-align: center;
  font-size: 13px !important;
}
</style>
