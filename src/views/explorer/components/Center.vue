<template>
  <div class="c-main">
    <el-row>
      <!-- <el-col :span="18">
        <Organizations class="org" />
      </el-col>
      <el-col :span="6">
        <Status class="org" />
      </el-col> -->
      <el-col
        :span="24"
        style="height: 30vh;"
      >
        <LineChart :name="'line'" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="title">
          <span>区块</span>
          <a href="#/chain/blocks">查看更多</a>
        </div>
        <Blocks class="txs" />
      </el-col>
      <el-col :span="12">
        <div class="title">
          <span>交易</span>
          <a href="#/chain/transactions">查看更多</a>
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
export default {
  name: 'Center',
  components: { Blocks, Txs, LineChart },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.c-main {
  height: 100%;
  width: 100%;
  // background-color: aqua;
}
.org {
  height: 30vh;
}
.txs {
  height: calc(62vh - 30px);
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 20px;
  span {
    font-size: 16px;
    color: rgba($color: #ffffff, $alpha: 1);
  }

  a {
    font-size: 14px;
    color: rgba($color: #1ab7e7, $alpha: 0.8);
  }
}
</style>
