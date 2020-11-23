<template>
  <div class="c-main">
    <el-row>
      <div class="block-container">
        <div class="info border-block  margin10">
          <div class="block-title">
            <span>
              区块/Block
            </span>
          </div>
          <div class="counter-container">
            <count-to :start-val="blockCount_old" :end-val="blockCount" :duration="260" class="card-panel-num c1" />
            <span>块</span>
          </div>
        </div>

        <div class="info border-block margin10">
          <div class="block-title">
            <span>
              数据/Data
            </span>
          </div>
          <div class="counter-container">
            <count-to :start-val="dataCount_old" :end-val="dataCount" :duration="260" class="card-panel-num c2" />
            <span>条</span>
          </div>
        </div>
        <div class="info border-block margin10">
          <div class="block-title">
            <span>
              设备/Device
            </span>
          </div>
          <div class="counter-container">
            <count-to :start-val="deviceCount_old" :end-val="deviceCount" :duration="260" class="card-panel-num c1" />
            <span>个</span>
          </div>
        </div>
        <div class="info border-block">
          <div class="block-title">
            <span>
              任务/Task
            </span>
          </div>
          <div class="counter-container">
            <count-to :start-val="taskCount_old" :end-val="taskCount" :duration="260" class="card-panel-num c2" />
            <span>个</span>
          </div>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24" style="height: 30vh;">
        <LineChart :name="'line'" />
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
      <el-col :span="12">
        <div class="title">
          <span>区块/Block</span>
          <a href="#/chain/blocks" />
        </div>
        <Blocks class="txs" />
      </el-col>
      <el-col :span="12">
        <div class="title">
          <span>交易/Transaction</span>
          <a href="#/chain/transactions" />
        </div>
        <Txs class="txs" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from '../charts/LineChart'
// import Organizations from './Organizatons'
// import Status from './Status'
import Txs from './Txs'
import Blocks from './Blocks'
import CountTo from 'vue-count-to'
import pump from '../data/pump'
export default {
  name: 'Center',
  components: { Blocks, Txs, LineChart, CountTo },
  data() {
    return {
      blockCount: 0,
      txCount: 0,
      deviceCount: 0,
      peerCount: 0,
      dataCount: 0,
      taskCount: 0,
      blockCount_old: 0,
      txCount_old: 0,
      deviceCount_old: 0,
      peerCount_old: 0,
      dataCount_old: 0,
      taskCount_old: 0
    }
  },
  created() {
    pump.taskCount.subscribe(item => {
      if (!item) return
      this.taskCount = item
      setTimeout(() => {
        this.taskCount_old = item
      }, 260)
    })
    pump.blockCount.subscribe(item => {
      if (!item) return
      this.blockCount = item
      setTimeout(() => {
        this.blockCount_old = item
      }, 260)
    })
    pump.txCount.subscribe(item => {
      if (!item) return
      this.txCount = item
      setTimeout(() => {
        this.txCount_old = item
      }, 260)
    })
    pump.deviceCount.subscribe(item => {
      if (!item) return
      this.deviceCount = item
      setTimeout(() => {
        this.deviceCount_old = item
      }, 260)
    })
    pump.peerCount.subscribe(item => {
      if (!item) return
      this.peerCount = item
      setTimeout(() => {
        this.peerCount_old = item
      }, 260)
    })
    pump.dataCount.subscribe(item => {
      if (!item) return
      this.dataCount = item
      setTimeout(() => {
        this.dataCount_old = item
      }, 260)
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.c-main {
  height: 100%;
  width: 100%;
  padding: 10px;
  // padding: 5px 20px;
  // background-color: aqua;

  .margin10 {
    margin-right: 10px;
  }
  .info {
    min-height: 60px;
    min-width: 230px;
    width: 15vw;
    height: 6vh;
    padding: 8px 8px;
    border-radius: 4px;
    background: rgba(11, 27, 72, 1);

    .block-title {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
    }
  }

  .block-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.org {
  height: 30vh;
}
.txs {
  height: calc(62vh - 110px);
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 6px;
  span {
    font-size: 18px;
    font-weight: 700;
    color: rgba($color: #ffffff, $alpha: 1);
  }

  a {
    font-size: 16px;
    color: #33ccff;
    margin-right: 5px;
  }
}
.counter-container {
  float: right;
  span {
    font-size: 16px;
    color: #ffffff;
  }
}
.card-panel-num {
  font-size: 16px;
}
.c1 {
  color: #33ccff !important;
}
.c2 {
  color: #ffcc00 !important;
}
</style>
