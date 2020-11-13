<template>
  <div class="r-main">
    <div class="block">
      <div class="row">
        <div>
          <p>节点运行</p>
        </div>
      </div>
      <div class="row">
        <span>节点</span>
        <span>状态</span>
      </div>
      <div v-for="(item) in orderers" :key="item.name" class=" row">
        <span>{{ item.name }}</span>
        <span>
          <el-tag v-if="item.status==='RUNNING'" effect="dark">{{ item.status | NodeStatus }}</el-tag>
          <el-tag v-else type="danger" effect="dark">{{ item.status | NodeStatus }}</el-tag>
        </span>
      </div>
      <div v-for="(item,i) in peers" :key="i" class=" row">
        <span>{{ item.name }}</span>
        <span>
          <el-tag v-if="item.status==='RUNNING'" effect="dark">{{ item.status | NodeStatus }}</el-tag>
          <el-tag v-else type="danger" effect="dark">{{ item.status | NodeStatus }}</el-tag>
        </span>
      </div>
    </div>
    <div class="block">
      <div class="row">
        <div>
          <p>设备信息</p>
        </div>
      </div>
      <div class="row">
        <span>devId</span>
        <span>注册状态</span>
      </div>
      <div v-for="(item) in devices" :key="item.id" class=" row">
        <span>{{ item.devId }}</span>
        <span>
          <el-tag v-if="item.status==='REGISTERED'" effect="dark">{{ item.status | regStatus }}</el-tag>
          <el-tag v-else type="danger" effect="dark">{{ item.status | regStatus }}</el-tag>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import { getNodes } from '@/api/contract'
// import { getDeviceList } from '@/api/equipment'
export default {
  name: 'Center',
  data() {
    return {
      orderers: [],
      peers: [],
      devices: []
    }
  },
  async created() {
    this.getNodes()
    this.getDevices()
  },
  methods: {
    async getNodes() {
      const response = await getNodes()
      console.log(response)
      this.orderers = response.orderers
      response.organizations.forEach(organization => {
        this.peers = [...this.peers, ...organization.peers]
      })
    },
    async getDevices() {
      // const response = await getDeviceList({ limit: 999, page: 0 })
      // this.devices = response.content
    }
  }
}
</script>
<style lang="scss" scoped>
.r-main {
  height: 100%;
  width: 100%;
  border-left: 0.01vh solid #00507a;
  overflow: hidden;
  .block {
    height: 48%;
    overflow: hidden;
  }
}
.row {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  margin: 1px;
  display: flex;
  box-shadow: rgba(10, 114, 212, 0.2) 0 0 3px;
  background: rgba(10, 54, 112, 0.2);

  // & :first-child {
  //   text-align: left;
  // }
  p {
    font-size: 16px;
    color: rgba($color: #ffffff, $alpha: 1);
    width: 100%;
    text-align: center;
  }
  span {
    // width: 50%;
    font-size: 14px;
    color: rgba($color: #dddddd, $alpha: 1);
    text-align: center;
  }
}
</style>
