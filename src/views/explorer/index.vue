<template>
  <div class="explorer">
    <TopBar class="top-bar" />
    <el-row>
      <el-col :span="5">
        <Left class="main" />
      </el-col>
      <el-col :span="13">
        <Center class="main" />
      </el-col>
      <el-col :span="6">
        <Right />
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

import { interval } from 'rxjs'
import { intervalImmediately } from './charts/rx'
import { retryWhen } from 'rxjs/operators'
import { getContractDataList } from '@/api/contract'
import { showContractDataCount } from '../../utils/variables'
import { socketUrl } from '@/utils/websocket'
import { lastestBlocks, lastestTxs } from '@/api/explorer'
import {
  latestData,
  totalData,
  totalTask
} from '@/api/swarm'
export default {
  name: 'Explorer',
  components: { TopBar, Center, Left, Right },
  data() {
    return {
      labelMap: {},
      tlvArr: []
    }
  },
  /**
   * 创建websocket
   * 初始化数据
   */
  created() {
    // this.loadData();

    // this.initWebsocket()

    this.sub = intervalImmediately(10 * 1000)
      .pipe(
        retryWhen(() => {
          return interval(10 * 1000)
        })
      )
      .subscribe(() => {
        this.latestData()
        this.lastestBlocks()
        this.lastestTxs()
        this.totalNums()
      })

    //  this.latestData();
  },
  destroyed() {
    if (this.socket) {
      this.socket.close()
    }
    if (this.timeoutObj) {
      clearInterval(this.timeoutObj)
    }
  },
  methods: {
    totalNums() {
      totalData().then(res => {
        pump.dataCount.next(res.data.totalData)
      })

      totalTask().then(res => {
        pump.taskCount.next(res.data.totalTask)
      })
    },
    lastestBlocks() {
      lastestBlocks().then(res => {
        res.data.list
          .sort((x, y) => x.time - y.time)
          .forEach(el => {
            pump.blocks.next(el)
          })
      })
    },
    lastestTxs() {
      lastestTxs().then(res => {
        res.data.list
          .sort((x, y) => x.time - y.time)
          .forEach(el => {
            pump.txs.next(el)
          })
      })
    },
    latestData() {
      latestData().then(res => {
        res.data.latestData
          .sort((x, y) => x.time - y.time)
          .forEach(el => {
            pump.contract_data.next(el)
          })
        res.data.latestData
          .sort((x, y) => -x.time + y.time)
          .forEach(el => {
            pump.data.next(el)
          })
      })
    },
    loadData() {
      getBlockList({ page: 0, limit: 10 }).then(response => {
        response.content
          .sort((x, y) => x.number - y.number)
          .forEach(element => {
            pump.blocks.next(element)
          })
      })

      getTxList({ page: 0, limit: 10 }).then(response => {
        response.content
          .sort((x, y) => x.blockNumber - y.blockNumber)
          .forEach(element => {
            pump.txs.next(element)
          })
      })

      getDashboard().then(response => {
        // pump.summary_data.next(response)
        pump.blockCount.next(response.blockCount)
        pump.txCount.next(response.txCount)
        pump.dataCount.next(response.dataCount)
      })

      getContractDataList({ limit: showContractDataCount, page: 0 }).then(
        response => {
          console.log(response)
          response.content
            .sort((x, y) => x.timestamp - y.timestamp)
            .forEach(el => {
              pump.contract_data.next(el)
            })
        }
      )
    },
    initWebsocket: function () {
      if (typeof WebSocket === 'undefined') {
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
            case 1:
              this.socket.send(``)
              break
            case 3:
              this.initWebsocket()
              break
          }
        }, heartBeat * 4 * 1000)
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

      pump.blockCount.next(obj.blockCount)
      pump.txCount.next(obj.txCount)
      pump.dataCount.next(obj.dataCount)

      pump.blocks.next(obj.lastestBlock)

      setTimeout(() => {
        obj.lastestTxs.forEach(element => {
          pump.txs.next(element)
        })
      }, 1000 * Math.random())
      setTimeout(() => {
        obj.simData.forEach(element => {
          pump.contract_data.next(element)
        })
      }, 2000 * Math.random())
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

<style lang="scss"  >
.explorer {
  ::-webkit-scrollbar {
    display: none;
  }
  font-family: "NotoSansCJKsc";
  height: 100vh;
  width: 100vw;
  min-width: 1900px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(8, 12, 34, 1) 0%,
    rgba(1, 3, 20, 1) 100%
  );
  .top-bar {
    height: 6vh;
    // width: 100vw;
    width: 100%;
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

.border-block {
  border: 1px solid #00507a;
  margin-bottom: 10px;
}
#u178_div {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: inherit;
  background-color: rgba(0, 0, 0, 0.498039215686275);
  border: none;
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
