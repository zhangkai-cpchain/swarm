<template>
  <div
    :id="name"
    style="height: 100%; width: 100%"
  />
</template>

<script>
import echarts from 'echarts'
import pump from '../data/pump'
import { showChartDataCount } from '../../../utils/variables'
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
      charts: '',
      list: [],
      option: {
        legend: {
          data: ['调节池(进水)', '清水池(出水)'],
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
            name: '调节池(进水)',
            type: 'bar',
            data: []
          }
        ]
      }
    }
  },
  watch: {
    // 观察option的变化
    list: {
      handler(newVal, oldVal) {
        if (this.charts) {
          if (newVal) {
            this.refreshData(newVal)
          }
        } else {
          this.drawLine(this.name)
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  created() {
    this.qingshuichi_output_water_ph = pump.bar_data.subscribe(data => {
      if (!data) return
      this.list.push(data)
      if (this.list.length > showChartDataCount) { this.list.shift() }
    })
  },
  beforeDestroy() {
    this.qingshuichi_output_water_ph.unsubscribe()
  },
  // 调用
  mounted() {
    this.$nextTick(function () {
      this.drawLine(this.name)
    })
  },

  methods: {
    refreshData(data) {
      const vs = data
      const xs = vs.map(item => {
        const ts = new Date(item[0])
        const m = ts.getMinutes()
        const n = m < 10 ? '0' + m : m
        return ts.getHours() + ':' + n
      })
      const ys = vs.map(item => item[1])

      this.option.xAxis.data = xs
      this.option.series[0].data = ys

      this.charts.setOption(this.option)
    },

    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id))
      window.addEventListener('resize', this.charts.resize)
      this.charts.setOption({
        title: {
          text: '测试统计值',
          textStyle: {
            color: '#F8FCFF', fontSize: 15,
            fontWeight: 'normal',
            fontFamily: 'SourceHanSansCN-Medium'
          }
        },
        tooltip: { trigger: 'item' },

        xAxis: {
          type: 'category',
          data: this.xAxis,
          axisLabel: {
            color: '#A1A6A5'
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#A1A6A5'
          },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          min: 0
        },

        series: [
          {
            type: 'bar',
            name: '调节池(进水)',
            itemStyle: {
              normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: 'rgba(76, 117, 255, 1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(76, 117, 255, 0)' // 100% 处的颜色
                }]
                ), // 背景渐变色
                barBorderRadius: [30, 30, 0, 0]
              }

            },
            barWidth: '12%'
          }
        ]
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
