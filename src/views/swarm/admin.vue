<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="4" :sm="4" :lg="4">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>集群设备总数</span>
          </div>
          <span>100</span>
        </el-card>
      </el-col>
      <el-col :xs="4" :sm="4" :lg="4">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>注册人员总数</span>
          </div>
          <span>100</span>
        </el-card>
      </el-col>
      <el-col :xs="4" :sm="4" :lg="4">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>采集数据总数</span>
          </div>
          <span>100</span>
        </el-card>
      </el-col>
      <el-col :xs="4" :sm="4" :lg="4">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>发布任务总数</span>
          </div>
          <span>100</span>
        </el-card>
      </el-col>
      <el-col :xs="4" :sm="4" :lg="4">
        <el-card class="card-height">
          <div slot="header" class="clearfix">
            <span>查询总数</span>
          </div>
          <span>100</span>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="异常报警" name="first">
        <section>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="no" label="序号" />
            <el-table-column prop="obj" label="对象" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="type" label="类型/权限等级" />
            <el-table-column prop="date" label="预警时间" />
            <el-table-column align="center" label="预警内容">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope)">{{ scope.row.text }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </el-tab-pane>
      <el-tab-pane label="设备监控" name="second">
        <section>
          <section class="tags">
            <el-tag effect="dark" type="success" />
            <p>空闲</p>
            <el-tag effect="dark" type="warning" />
            <p>任务</p>
            <el-tag effect="dark" type="danger" />
            <p>故障</p>
          </section>

          <section class="items">
            <Card v-for="(item,i) in list" :key="i" :item="item" />
          </section>
        </section>
      </el-tab-pane>
      <el-tab-pane label="人员监控" name="third">
        <section class="items">
          <Member v-for="(item,i) in list" :key="i" :item="item" />
        </section>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="报警详情" :visible.sync="dialogVisible" class="warning-container">
      <Warning />
    </el-dialog>
  </div>
</template>
<script>
import Card from './components/Card'
import Member from './components/member'
import Warning from './components/warning'
export default {
  components: { Card, Member, Warning },
  data() {
    return {
      eventData: {},
      dialogVisible: false,
      list: [{
        id: '1',
        name: '无人机1',
        status: 'free',
        type: 'UAV',
        No: '1824',
        location: '127.1',
        spec: '8086',
        regTime: '2020/10/29'
      }, {
        id: '1',
        name: '无人机1',
        status: 'free',
        type: 'UAV',
        No: '1824',
        location: '127.1',
        spec: '8086',
        regTime: '2020/10/29'
      }, {
        id: '1',
        name: '无人机1',
        status: 'task',
        type: 'UAV',
        No: '1824',
        location: '127.1',
        spec: '8086',
        regTime: '2020/10/29'
      }, {
        id: '1',
        name: '无人机1',
        status: 'fault',
        type: 'UAV',
        No: '1824',
        location: '127.1',
        spec: '8086',
        regTime: '2020/10/29'
      }

      ],
      activeName: 'first',
      tableData: [{
        no: 1,
        obj: '集群',
        id: 1,
        date: '2016-05-02',
        type: 'UAV',
        text: '传感器故障'
      }, {
        no: 1,
        obj: '集群',
        id: 1,
        date: '2016-05-02',
        type: 'UAV',
        text: '传感器故障'
      }, {
        no: 1,
        obj: '集群',
        id: 1,
        date: '2016-05-02',
        type: 'UAV',
        text: '传感器故障'
      }, {
        no: 1,
        obj: '集群',
        id: 1,
        date: '2016-05-02',
        type: 'UAV',
        text: '传感器故障'
      }, {
        no: 1,
        obj: '集群',
        id: 1,
        date: '2016-05-02',
        type: 'UAV',
        text: '传感器故障'
      }, {
        no: 1,
        obj: '集群',
        id: 1,
        date: '2016-05-02',
        type: 'UAV',
        text: '传感器故障'
      }]
    }
  },
  methods: {
    handleEdit(scope) {
      this.dialogVisible = true
      this.checkStrictly = true
      this.eventData = scope
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss">
.card-height {
  height: 120px !important;
  margin-bottom: 20px;
  margin-right: 20px;
}

.tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 150px;
  span {
    padding: 0 20px;
    margin: 0 4px;
  }

  p {
    margin-right: 10px;
  }
}
.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
}

.flex-row-between {
  justify-content: space-between;
  padding-right: 300px;
}
</style>
