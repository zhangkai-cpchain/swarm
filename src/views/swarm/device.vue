<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <section class="forms">
            <el-form class="form-inline" :label-position="'left'" label-width="100px">
              <el-form-item label="类型:">
                <span>{{ item.type }}</span>
              </el-form-item>
              <el-form-item label="编号:">
                <span>{{ item.machineId }}</span>
              </el-form-item>
              <el-form-item label="状态:">
                <span>{{ statusCode | machineStatus }}</span>
              </el-form-item>
            </el-form>
            <el-form :label-position="'left'" label-width="100px">
              <el-form-item label="位置:">
                <span>{{ item.qps }}</span>
              </el-form-item>
              <el-form-item label="规格:">
                <span>{{ item.size }}</span>
              </el-form-item>
              <el-form-item label="注册:">
                <span>{{ item.registerTime | parseTime }}</span>
              </el-form-item>
            </el-form>
          </section>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>执行任务总数</span>
          </div>
          <div class="big-number">
            <count-to :start-val="0" :end-val="totalTask" :duration="360" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>数据采集总数</span>
          </div>
          <div class="big-number">
            <count-to :start-val="0" :end-val="totalData" :duration="360" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="card-m">
          <div slot="header" class="clearfix">
            <span>任务执行统计</span>
          </div>
          <TaskChart :info="taskInfo" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="card-m">
          <div slot="header" class="clearfix">
            <span>数据采集统计</span>
          </div>
          <DataChart :info="dataInfo" />
        </el-card>
      </el-col>
    </el-row>
    <el-card class="card-m">
      <div slot="header" class="clearfix">
        <span>传感器详情</span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="150px" />
        <el-table-column prop="name" label="传感器" width="300px" />
        <el-table-column prop="value" label="值" min-width="500px">
          <template slot-scope="{row}">{{ sensorValue[ row.type] }}</template>
        </el-table-column>
        <el-table-column prop="date" label="更新时间" width="250px">
          <template slot-scope="{row}">{{ updateTIme[ row.type] | parseTime }}</template>
        </el-table-column>
        <el-table-column align="center" label="管理" width="200px">
          <template slot-scope="scope">
            <el-button :loading="loading[scope.row.type]" type="primary" size="small" @click="getSensorValue(scope.row.type)">刷新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import DataChart from './components/dataChart'
import TaskChart from './components/taskChart'
import { machineDetail, sensorValue } from '@/api/swarm'
import CountTo from 'vue-count-to'
export default {
  name: 'Device',
  components: { DataChart, TaskChart, CountTo },
  data() {
    return {
      statusCode: '',
      item: {},
      taskInfo: {},
      dataInfo: {},
      sensorValue: {},
      loading: {
        color: false,
        motion: false,
        pressure: false,
        temperature: false
      },
      updateTIme: {
        color: Date.now(),
        motion: Date.now(),
        pressure: Date.now(),
        temperature: Date.now()
      }
    }
  },
  computed: {
    totalTask() {
      let sum = 0
      if (!this.taskInfo) return 0
      for (const key in this.taskInfo) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.taskInfo.hasOwnProperty(key)) {
          const element = this.taskInfo[key]
          const num = parseInt(element)
          sum += num
        }
      }

      return sum
    },
    totalData() {
      let sum = 0
      if (!this.dataInfo) return 0
      for (const key in this.dataInfo) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.dataInfo.hasOwnProperty(key)) {
          const element = this.dataInfo[key]
          const num = parseInt(element)
          sum += num
        }
      }
      return sum
    },
    tableData() {
      return [
        {
          id: 1,
          name: '色彩传感器',
          type: 'color'
        },
        {
          id: 2,
          name: '运动传感器',
          type: 'motion'
        },
        {
          id: 3,
          name: '气压传感器',
          type: 'pressure'
        },
        {
          id: 4,
          name: '温湿度传感器',
          type: 'temperature'
        }
      ]
    }
  },
  created() {
    console.log(this.$route.query.machineId)
    machineDetail({ machineId: this.$route.query.machineId }).then(res => {
      this.item = res.data.basicInfo
      this.taskInfo = res.data.taskInfo
      this.dataInfo = res.data.dataInfo
      this.sensorValue = res.data.sensorValue

      const arr = ['free', 'task', 'fault']
      console.log(this.item.machineStatus, arr[this.item.machineStatus])
      this.statusCode = arr[this.item.machineStatus] || 'free'
    })
  },
  methods: {
    getSensorValue(sensorType) {
      this.$set(this.loading, sensorType, true)
      this.$set(this.updateTIme, sensorType, Date.now())
      sensorValue({
        machineId: this.$route.query.machineId,
        sensorType
      })
        .then(res => {
          this.$set(this.sensorValue, sensorType, res.data.result)
          this.$set(this.loading, sensorType, false)
        })
        .catch(() => {
          this.$set(this.loading, sensorType, false)
        })
    }
  }
}
</script>

<style lang="scss">
.card-height {
  height: 247px;
  margin-bottom: 20px;
}

.card-m {
  margin-bottom: 20px;
}
.forms {
  display: flex;
  flex-direction: row;
  .form-inline {
    display: inline;
    width: 48%;
  }
}

.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
.big-number {
  font-size: 40px;
  display: flex;
  // justify-content: ;
  align-items: center;
}
</style>
