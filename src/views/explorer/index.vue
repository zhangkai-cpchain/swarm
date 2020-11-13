<template>
  <div class="explorer">
    <TopBar class="top-bar" />
    <el-row>
      <el-col :span="5">
        <Left class="main" />
      </el-col>
      <el-col :span="14">
        <Center class="main" />
      </el-col>
      <el-col :span="5">
        <Right class="main" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import Center from './components/Center'
import Left from './components/Left'
import Right from './components/Right'
import { getBlockList, getTxList, getDashboard } from '@/api/blocks'
import { heartBeat } from '@/utils/variables'
import pump from './data/pump'
import { getContractDataList } from '@/api/contract'
import { showContractDataCount } from '../../utils/variables'
import { socketUrl } from '@/utils/websocket'

export default {
  name: 'Explorer',
  components: { TopBar, Center, Left, Right },
  data() {
    return {
      labelMap: {
      },
      tlvArr: []
    }
  },
  /**
   * 创建websocket
   * 初始化数据
   */
  created() {
    this.loadData()
    this.initWebsocket()
  },
  destroyed() {
  },
  methods: {

    loadData() {
      getBlockList({ page: 0, limit: 10 }).then(response => {
        response.content.sort((x, y) => x.number - y.number).forEach(element => {
          pump.blocks.next(element)
        })
      })

      getTxList({ page: 0, limit: 10 }).then(response => {
        response.content.sort((x, y) => x.blockNumber - y.blockNumber).forEach(element => {
          pump.txs.next(element)
        })
      })

      getDashboard().then(response => {
        pump.summary_data.next(response)
      })

      getContractDataList({ limit: showContractDataCount }).then(response => {
        response.content.sort((x, y) => x.updatedAt - y.updatedAt).forEach(el => {
          pump.contract_data.next(el)
        })
      }
      )
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

      pump.blocks.next(obj.latestBlock)

      obj.latestTxs.forEach(element => {
        pump.txs.next(element)
      })

      obj.simData.forEach(element => {
        pump.contract_data.next(element)
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
.explorer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(12, 22, 67, 1) 0%,
    rgba(2, 7, 28, 1) 100%
  );
  .top-bar {
    height: 6vh;
    width: 100vw;
    background: linear-gradient(
      180deg,
      rgba(0, 62, 121, 1) 0%,
      rgba(0, 29, 67, 1) 100%
    );
  }
  .main {
    height: 94vh;
  }
  .box {
    height: 200px;
    margin: 100px;
    background: #ffffff;
  }
}
</style>
