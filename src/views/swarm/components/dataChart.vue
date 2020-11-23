<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          image: 66,
          video: 66,
          pressure: 66,
          motion: 66,
          color: 66,
          temperature: 66
        }
      }
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    info() {
      this.initChart()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['图像', '视频', '气压', '运动', '颜色', '温湿度']
        },
        series: [
          {
            name: '数据采集统计',
            type: 'pie',
            // roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: this.info.image, name: '图像' },
              { value: this.info.video, name: '视频' },
              { value: this.info.pressure, name: '气压' },
              { value: this.info.motion, name: '运动' },
              { value: this.info.color, name: '颜色' },
              { value: this.info.temperature, name: '温湿度' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
