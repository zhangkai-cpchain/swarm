<template>
  <div style="height: 100%; width: 100%">
    <div class="switch">
      <el-radio-group
        v-model="time"
        size="mini"
      >
        <el-radio-button
          v-for="(label,i) in labels"
          :key="i"
          type="success"
          :label="label"
        />

      </el-radio-group>
      <!-- <el-switch
        v-model="byDay"
        style="display: block"
        active-color="#67C23A"
        inactive-color="#409EFF"
        active-text="每一天统计"
        inactive-text="每小时统计"
      /> -->

    </div>
    <div
      :id="name"
      style="height: 100%; width: 100%"
    />
  </div>

</template>

<script>
import echarts from 'echarts'
import { heartBeat } from '../../../utils/variables'
import { interval } from 'rxjs'
import { intervalImmediately } from './rx'
import { concatAll, map, retryWhen } from 'rxjs/operators'
import { getBlocksDaily, getTxsDaily, getDataDaily, getBlocksHourly, getTxsHourly, getDataHourly } from '@/api/contract'
export default {
  name: 'Ph',
  props: {
    name: {
      type: String,
      default: 'echartdiv'
    }
  },
  data() {
    return {
      byDay: false,
      time: '1H',
      labels: ['1H', '1D'],
      charts: '',
      list: [],
      option: {
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     // dataView: { show: true, readOnly: false },
        //     // magicType: { show: true, type: ['line', 'bar'] },
        //     // restore: { show: true },
        //     // selfButtons: {// 自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
        //     //   show: true, // 是否显示
        //     //   title: '自定义', // 鼠标移动上去显示的文字
        //     //   icon: 'test.png', // 图标
        //     //   option: {},
        //     //   onclick: function (option1) { // 点击事件,这里的option1是chart的option信息
        //     //     alert('1')// 这里可以加入自己的处理代码，切换不同的图形
        //     //   }
        //     // },
        //     // saveAsImage: { show: true },
        //     myToolsNum: {
        //       show: true,
        //       color: 'rgba(0, 155, 255, 1)',
        //       textAlign: 'center',
        //       text: '数量',
        //       title: '价格',
        //       symbolSize: 50,
        //       icon: 'image://https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1843753849,3675720061&fm=26&gp=0.jpg',
        //       onclick: function (o) {
        //         alert('2')
        //       }
        //     },
        //     myToolsPrice: {
        //       show: true,
        //       textAlign: 'center',
        //       text: '价格',
        //       title: '价格',
        //       fontSize: 50,
        //       icon: 'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603949084455&di=4971f1ebd104d98147099f57a0d96859&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F93%2F79%2F9656f2ac8cafafa.jpg',
        //       onclick: function (o) {
        //         alert('3')
        //       }
        //     }
        //   }

        // },

        legend: {
          data: ['区块数量', '交易数量', '上链数据'],
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
          {
            name: '交易数量',
            type: 'line',
            data: []
          },
          {
            name: '上链数据',
            type: 'line',
            data: []
          }
        ]
      }
    }
  },
  watch: {
    // 观察option的变化
    time: {
      handler(newVal, oldVal) {
        this.charts.showLoading({
          text: 'loading',
          color: 'rgba(123, 215, 124, 0.8)',
          textColor: '#fff',
          maskColor: 'rgba(255, 255, 255, 0)',
          zlevel: 0
        })
        this.getDataSwitch().then((res) => {
          this.charts.hideLoading()
          this.refreshData(res)
        })
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  created() {
    this.sub = intervalImmediately(3 * 1000)
      .pipe(
        map(x => {
          return this.getDataSwitch()
        }),
        concatAll(),
        retryWhen(() => {
          return interval(heartBeat * 2 * 1000)
        })
      )
      .subscribe(([blocks, txs, contractDatas]) => this.refreshData([blocks, txs, contractDatas]))
  },
  beforeDestroy() {
    // this.qingshuichi_output_water_ph.unsubscribe()
    if (this.sub) this.sub.unsubscribe()
  },
  // 调用
  mounted() {
    this.$nextTick(function () {
      this.drawLine(this.name)
    })
  },

  methods: {
    async getDataSwitch() {
      switch (this.time) {
        case '1D': return Promise.all([getBlocksDaily(), getTxsDaily(), getDataDaily()])
        case '1H': return Promise.all([getBlocksHourly(), getTxsHourly(), getDataHourly()])
        default: return Promise.all([getBlocksHourly(), getTxsHourly(), getDataHourly()])
      }
      // if (this.byDay) {
      //   return Promise.all([getBlocksDaily(), getTxsDaily(), getDataDaily()])
      // } else {
      //   return Promise.all([getBlocksHourly(), getTxsHourly(), getDataHourly()])
      // }
    },
    refreshData([blocks, txs, contractDatas]) {
      const timeAll = [...(blocks || []), ...(txs || []), ...(contractDatas || [])]

      if (timeAll.length === 0) return
      const xs = Array.from(new Set(timeAll.map(item => item[0])))
      // console.log(xs)

      this.option.xAxis.data = xs

      const v1 = []
      const v2 = []
      const v3 = []

      xs.forEach(x => {
        const block = blocks.find(p => p[0] === x)
        const tx = txs.find(p => p[0] === x)
        const contractData = contractDatas.find(p => p[0] === x)
        v1.push(block ? block[1] : 0)
        v2.push(tx ? tx[1] : 0)
        v3.push(contractData ? contractData[1] : 0)
      })

      console.log(xs, v1, v2, v3)
      this.option.series[0].data = v1
      this.option.series[1].data = v2
      this.option.series[2].data = v3

      this.charts.setOption(this.option)
    },

    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id))
      window.addEventListener('resize', this.charts.resize)
      this.charts.setOption({
        title: {
          // text: '测设统计值',
          textStyle: {
            color: '#F8FCFF', fontSize: 15,
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
              normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: 'rgba(0, 255, 255, 1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0, 255, 255, 0)' // 100% 处的颜色
                }]
                ), // 背景渐变色
                lineStyle: { // 系列级个性化折线样式
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
              normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: 'rgba(255, 55, 255, 1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255, 55, 255, 0)' // 100% 处的颜色
                }]
                ), // 背景渐变色
                lineStyle: { // 系列级个性化折线样式
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
              normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: 'rgba(255, 255, 55, 1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255, 255, 55, 0)' // 100% 处的颜色
                }]
                ), // 背景渐变色
                lineStyle: { // 系列级个性化折线样式
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
