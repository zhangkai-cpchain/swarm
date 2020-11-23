<template>
  <div style="height: 100%; width: 100%;     background: rgba(11, 27, 72, 1);" class="border-block">
    <!-- <div class="switch">
      <el-radio-group v-model="time" size="mini">
        <el-radio-button v-for="(label,i) in labels" :key="i" type="success" :label="label" />
      </el-radio-group>
    </div>-->
    <div id="lineChart" style="height: 100%; width: 100%" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { showContractDataCount } from '../../../utils/variables'
import pump from '../data/pump'
import { parseTime } from '@/utils/index.js'
const timeGrid = 60
export default {
  name: 'LineChart',
  props: {
    name: {
      type: String,
      default: 'echartdiv'
    }
  },
  data() {
    return {
      txGrid: [],
      blockGrid: [],
      dataGrid: [],
      startTime: '',
      lastedTime: 0,
      block_startTime: '',
      block_lastedTime: 0,
      txs_startTime: '',
      txs_lastedTime: 0,
      byDay: false,
      time: '1H',
      labels: ['1H', '1D'],
      charts: '',
      list: [],
      option: {
        legend: {
          data: ['区块数量', '上链数据'],
          textStyle: {
            color: '#A1A6A5'
          },
          x: 'right'
        },
        xAxis: {
          data: []
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '区块数量',
            type: 'line',
            data: []
          },
          // {
          //   name: "交易数量",
          //   type: "line",
          //   data: []
          // },
          {
            name: '上链数据',
            type: 'line',
            data: []
          }
        ]
      }
    }
  },
  created() {
    pump.contract_data.subscribe(element => {
      if (!element || !element.time) return
      if (!this.startTime) {
        this.startTime = element.time
      }

      if (element.time < this.lastedTime) return

      this.lastedTime = element.time
      while (element.time > this.startTime + timeGrid * 1000) {
        this.startTime = this.startTime + timeGrid * 1000
      }
      // if (element.time > this.startTime + timeGrid * 1000) {
      //   this.startTime = this.startTime + timeGrid * 1000;
      // }

      const timeStr = ~~(this.startTime / (timeGrid * 1000))
      const ex = this.dataGrid.find(p => p[0] === timeStr)
      if (ex) {
        ex[1] = ex[1] + 1
      } else {
        this.dataGrid.push([timeStr, 1])
      }

      if (this.dataGrid.length > showContractDataCount) {
        this.dataGrid.shift()
      }
    })
    pump.blocks.subscribe(element => {
      if (!element || !element.time) return
      if (!this.block_startTime) {
        this.block_startTime = element.time
      }

      if (element.time < this.block_lastedTime) return

      this.block_lastedTime = element.time
      while (element.time > this.block_startTime + timeGrid * 1000) {
        this.block_startTime = this.block_startTime + timeGrid * 1000
      }

      const timeStr = ~~(this.block_startTime / (timeGrid * 1000))
      const ex = this.blockGrid.find(p => p[0] === timeStr)
      if (ex) {
        ex[1] = ex[1] + 1
      } else {
        this.blockGrid.push([timeStr, 1])
      }
      if (this.blockGrid.length > showContractDataCount) {
        this.blockGrid.shift()
      }
    })
    pump.txs.subscribe(element => {
      if (!element || !element.time) return
      if (!this.txs_startTime) {
        this.txs_startTime = element.time
      }

      if (element.time < this.txs_lastedTime) return

      this.txs_lastedTime = element.time

      while (element.time > this.txs_startTime + timeGrid * 1000) {
        this.txs_startTime = this.txs_startTime + timeGrid * 1000
      }
      // if (element.time > this.txs_startTime + timeGrid * 1000) {
      //   this.txs_startTime = this.txs_startTime + timeGrid * 1000;
      // }

      const timeStr = ~~(this.txs_startTime / (timeGrid * 1000))
      const ex = this.txGrid.find(p => p[0] === timeStr)
      if (ex) {
        ex[1] = ex[1] + 1
      } else {
        this.txGrid.push([timeStr, 1])
      }

      if (this.txGrid.length > showContractDataCount) {
        this.txGrid.shift()
      }
    })

    setInterval(() => {
      if (this.charts) { this.refreshData([this.blockGrid, this.txGrid, this.dataGrid]) }
    }, 3000)
  },
  beforeDestroy() {
    // this.qingshuichi_output_water_ph.unsubscribe()
    if (this.sub) this.sub.unsubscribe()
  },
  // 调用
  mounted() {
    this.$nextTick(function () {
      this.drawLine('lineChart')
    })
  },

  methods: {
    // async getDataSwitch() {

    //   return Promise.all([getBlocksHourly(), getTxsHourly(), getDataHourly()]);
    // },
    refreshData([blocks, txs, contractDatas]) {
      const timeAll = [
        ...(blocks || []),
        ...(txs || []),
        ...(contractDatas || [])
      ]
      if (timeAll.length === 0) return
      const xs = Array.from(
        new Set(timeAll.sort((x, y) => -y[0] + x[0]).map(item => item[0]))
      )

      this.option.xAxis.data = xs.map(p => parseTime(p * (timeGrid * 1000), '{h}:{i}:{s}'))

      const v1 = []
      const v2 = []
      // const v3 = []

      xs.forEach(x => {
        const block = blocks.find(p => p[0] === x)
        // const tx = txs.find(p => p[0] === x);
        const contractData = contractDatas.find(p => p[0] === x)
        v1.push(block ? block[1] : 0)
        // v2.push(tx ? tx[1] : 0);
        v2.push(contractData ? contractData[1] : 0)
      })

      this.option.series[0].data = v1
      this.option.series[1].data = v2

      this.charts.setOption(this.option)
    },

    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id))
      window.addEventListener('resize', this.charts.resize)
      this.charts.setOption({
        title: {
          // text: '测设统计值',
          textStyle: {
            color: '#F8FCFF',
            fontSize: 15,
            fontWeight: 'normal',
            fontFamily: 'SourceHanSansCN-Medium'
          }
        },

        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.xAxis,
          axisLabel: {
            color: '#A1A6A5'
          },
          axisLine: {
            show: false
          },

          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '',
          nameTextStyle: { color: '#A1A6A5' },
          min: 0,
          axisLabel: {
            color: '#A1A6A5'
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: 'line',
            symbol: 'none',
            smooth: false,
            areaStyle: { opacity: 0.029 },
            itemStyle: {
              normal: {
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 255, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 255, 0)' // 100% 处的颜色
                  }
                ]), // 背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: 'solid',
                  color: 'rgba(0, 255, 255, 1)'
                }
              }
            }
          },
          {
            type: 'line',
            symbol: 'none',
            smooth: false,
            areaStyle: { opacity: 0.029 },
            itemStyle: {
              normal: {
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(255, 55, 255, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 55, 255, 0)' // 100% 处的颜色
                  }
                ]), // 背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: 'solid',
                  color: 'rgba(255, 55, 255, 1)'
                }
              }
            }
          },
          {
            type: 'line',
            symbol: 'none',
            smooth: false,
            areaStyle: { opacity: 0.029 },
            itemStyle: {
              normal: {
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(255, 255, 55, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 55, 0)' // 100% 处的颜色
                  }
                ]), // 背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: 'solid',
                  color: 'rgba(255, 255, 55, 1)'
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss"  >
.switch {
  // width: 50%;
  top: 10px;
  left: 20px;
  position: absolute;
  z-index: 10000;
  display: flex;
  justify-content: center;
}

.el-radio-button {
  position: relative;
  display: inline-block;
  outline: none;
  opacity: 0.8;
}

.is-active {
  position: relative;
  display: inline-block;
  outline: none;
  opacity: 1 !important;
}

// .el-radio-button__inner {
//   background-color: #67c23a !important;
//   border-color: #67c23a !important;
// }
</style>
