<template>
  <div class="dashboard-editor-container">
    <panel-group :panel-data="panelData" />

    <el-row :gutter="8">
      <el-col
        v-stage="1"
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:20px;margin-bottom:30px;"
      >
        <h4>最新区块</h4>
        <el-table
          :data="blocks"
          style="width: 100%;padding-top: 15px;"
        >
          <el-table-column
            label="区块高度"
            width="100"
          >
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column
            label="联盟"
            width="195"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.channel }}</template>
          </el-table-column>
          <el-table-column
            label="区块哈希"
            min-width="295"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.blockHash }}</template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="150"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col
        v-stage="1"
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;padding-left:20px"
      >
        <h4>最新交易</h4>
        <el-table
          :data="txs"
          style="width: 100%;padding-top: 15px;"
        >
          <el-table-column
            label="区块高度"
            width="100"
          >
            <template slot-scope="scope">{{ scope.row.blockNumber }}</template>
          </el-table-column>
          <el-table-column
            label="创建者"
            width="195"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.creatorName }}</template>
          </el-table-column>
          <el-table-column
            label="哈希"
            min-width="295"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.hash }}</template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="150"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import stage from '@/directive/stage'
import permission from '@/directive/permission'
import { getBlockList, getTxList, getDashboard } from '@/api/blocks'
import { heartBeat } from '@/utils/variables'
import { socketUrl } from '@/utils/websocket'
export default {
  name: 'DashboardAdmin',
  directives: { stage, permission },
  components: {
    PanelGroup
  },
  data() {
    return {
      socket: {},
      panelData: { blockCount: 0, dataCount: 0, deviceCount: 0, txCount: 0 },
      blocks: [],
      txs: [],
      timeoutObj: {}
    }
  },
  created() {
    this.loadData()
    // 初始化
    this.initWebsocket()
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close
  },
  methods: {
    loadData() {
      getBlockList({ page: 0, limit: 10 }).then(response => {
        this.blocks = response.content
      })
      getTxList({ page: 0, limit: 10 }).then(response => {
        this.txs = response.content
      })
      getDashboard().then(response => {
        this.panelData = response
      })
    },
    initWebsocket: function () {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(socketUrl)

        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage

        this.timeoutObj = setInterval(() => {
          // console.log(this.socket)
          switch (this.socket.readyState) {
            case 1: this.socket.send(``)
              break
            case 3:
              this.initWebsocket()
              break
          }
        }, heartBeat * 1000)
      }
    },
    open: function () {
      console.log('socket连接成功')
    },
    error: function () {
      console.log('连接错误')
    },
    getMessage: function (msg) {
      if (!msg.data) {
        return
      }
      const obj = JSON.parse(msg.data)
      this.panelData = obj

      this.blocks.unshift(obj.latestBlock)
      if (this.blocks.length > 10) {
        this.blocks.pop()
      }
      obj.latestTxs.forEach(element => {
        this.txs.unshift(element)
        if (this.txs.length > 10) {
          this.txs.pop()
        }
      })
    },
    send: function (params) {
      console.log('send:' + params)
      this.socket.send(params)
    },
    close: function () {
      console.log('socket已经关闭')
      clearInterval(this.timeoutObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  min-height: calc(100vh - 84px);
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
