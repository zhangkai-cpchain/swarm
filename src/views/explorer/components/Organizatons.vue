<template>
  <div id="org" class="o-main" />
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Center',
  data () {
    return {
      selectNode: '',
      charts: '',
      nodeName: ['节点1', '节点2', '节点4'],
      option: {
        title: {
          text: ''
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            color: 'rgba(0, 155, 255, 0.4)',
            roam: true,
            label: {
              show: true
            },
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: [{
              name: '节点1',
              x: 350,
              y: 100
            }, {
              name: '节点2',
              x: 750,
              y: 100
            }, {
              name: '节点3',
              x: 550,
              y: 200,
              itemStyle: {
                color: 'rgba(255, 105,  55, 0.8)'
              }
            }, {
              name: '节点4',
              x: 550,
              y: 350
            }],
            // links: [],
            links: [{
              source: 0,
              target: 1,
              lineStyle: {
                curveness: 0.1
              }
            }, {
              source: '节点1',
              target: '节点3'
            }, {
              source: '节点2',
              target: '节点3'
            }, {
              source: '节点2',
              target: '节点4',
              lineStyle: {
                curveness: 0.1
              }
            }, {
              source: '节点1',
              target: '节点4',
              lineStyle: {
                curveness: -0.1
              }
            }, {
              source: '节点3',
              target: '节点4'
            }
            ],
            lineStyle: {
              width: 2,
              curveness: 0,
              color: 'rgba(0, 255, 255, 0.8)'
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawLine('org')

      this.charts.on('click', (params) => {
        // 如果点击不是节点，不执行操作
        if (!this.nodeName.find(p => p === params.name)) return

        if (this.selectNode === params.name) {
          // 取消选中
          this.selectNode = ''
          const node = this.option.series[0].data.find(n => n.name === params.name)
          node.symbolSize = 50
          node.itemStyle = {
            color: 'rgba(0, 155, 255, 0.4)'
          }
          this.drawLine('org')
        } else {
          // 取消已有选中
          if (this.selectNode) {
            const nodeSelected = this.option.series[0].data.find(n => n.name === this.selectNode)
            nodeSelected.symbolSize = 50
            nodeSelected.itemStyle = {
              color: 'rgba(0, 155, 255, 0.4)'
            }
          }

          // 设置选中
          this.selectNode = params.name
          const node = this.option.series[0].data.find(n => n.name === params.name)
          node.symbolSize = 60
          node.itemStyle = {
            color: 'rgba(25, 205, 255, 1)'
          }

          this.drawLine('org')
        }
      })
    })
  },
  methods: {
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id))
      window.addEventListener('resize', this.charts.resize)
      this.charts.setOption(this.option)
    }
  }

}
</script>
<style lang="scss" scoped>
.o-main {
  height: 100%;
  width: 100%;
  // background-color: olive;
}
</style>
