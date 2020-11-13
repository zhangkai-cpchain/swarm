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
              <el-form-item label="用户ID">
                <span>1</span>
              </el-form-item>
              <el-form-item label="所属部门">
                <span>机密</span>
              </el-form-item>
              <el-form-item label="权限等级">
                <span>一级</span>
              </el-form-item>
            </el-form>
            <el-form :label-position="'left'" label-width="100px">
              <el-form-item label="用户ID">
                <span>1</span>
              </el-form-item>
              <el-form-item label="所属部门">
                <span>机密</span>
              </el-form-item>
              <el-form-item label="权限等级">
                <span>一级</span>
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
          <span>100</span>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>数据采集总数</span>
          </div>
          <span>100</span>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="card-m">
          <div slot="header" class="clearfix">
            <span>任务执行统计</span>
          </div>
          <TaskChart />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="card-m">
          <div slot="header" class="clearfix">
            <span>数据采集统计</span>
          </div>
          <DataChart />
        </el-card>
      </el-col>
    </el-row>
    <el-card class="card-m">
      <div slot="header" class="clearfix">
        <span>传感器详情</span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="传感器" />
        <el-table-column prop="value" label="值" />
        <el-table-column prop="date" label="更新时间" />
        <el-table-column align="center" label="管理">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">刷新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import DataChart from './components/dataChart'
import TaskChart from './components/taskChart'
export default {
  name: 'Device',
  components: { DataChart, TaskChart },
  data() {
    return {
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '色彩传感器',
        value: '100110'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '运动传感器',
        value: '100110'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '气压传感器',
        value: '100110'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '温湿度传感器',
        value: '100110'
      }]
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

.card-panel-num {
  font-size: 24px;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>
