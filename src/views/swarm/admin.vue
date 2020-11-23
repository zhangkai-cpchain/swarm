<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="6" :sm="6" :lg="6">
        <el-card class="card-height2">
          <div slot="header" class="clearfix">
            <span>集群设备总数</span>
          </div>
          <span>{{ totalMachine }}</span>
        </el-card>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="6">
        <el-card class="card-height2">
          <div slot="header" class="clearfix">
            <span>注册人员总数</span>
          </div>
          <span>{{ totalOperator }}</span>
        </el-card>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="6">
        <el-card class="card-height2">
          <div slot="header" class="clearfix">
            <span>采集数据总数</span>
          </div>
          <span>{{ totalData }}</span>
        </el-card>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="6">
        <el-card class="card-height2">
          <div slot="header" class="clearfix">
            <span>发布任务总数</span>
          </div>
          <span>{{ totalTask }}</span>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="异常报警" name="first">
        <section>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="no" label="序号" />
            <el-table-column prop="object" label="对象">
              <template slot-scope="scope">
                <span>{{ scope.row.object | objectName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="objectId" label="ID" />
            <el-table-column prop="date" label="类型/权限等级">
              <template slot-scope="scope">
                <span v-if="scope.row.object==='operator' ">{{ scope.row.role | roleName }}</span>
                <span v-if="scope.row.object==='machine' ">{{ scope.row.machineType | devName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="预警时间">
              <template slot-scope="scope">
                <span>{{ scope.row.time | parseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="预警内容">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope)">{{ scope.row.content }}</el-button>
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
            <el-tag effect="dark" type="danger" />
            <p>预警</p>
          </section>

          <section class="items">
            <Card v-for="(item,i) in list" :key="i" :uncheckable="true" :item="item" />
          </section>
        </section>
      </el-tab-pane>
      <el-tab-pane label="人员监控" name="third">
        <section class="items">
          <Member v-for="(item,i) in operators" :key="i" :item="item" />
        </section>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogVisible" width="60%" class="warning-container">
      <Warning :warning="eventData" @close="dialogVisible=false" />
    </el-dialog>
  </div>
</template>
<script>
import Card from './components/Card'
import Member from './components/member'
import Warning from './components/warning'
import {
  machineMonitor,
  operatorMonitor,
  warnings,
  totalData,
  totalTask
} from '@/api/swarm'
import { mapGetters } from 'vuex'
export default {
  components: { Card, Member, Warning },
  data() {
    return {
      totalMachine: 0,
      totalOperator: 0,
      totalTask: 0,
      totalData: 0,
      operators: [],
      eventData: {},
      dialogVisible: false,
      list: [],
      activeName: 'first',
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    console.log(this.roles, this.roles !== '1')
    if (this.roles !== '1') {
      this.$router.push({ path: '/401' })
      return
    }
    warnings().then(res => {
      const warnings = res.data.warnings
      for (let index = 0; index < warnings.length; index++) {
        const element = warnings[index]
        element.no = index + 1
      }
      this.tableData = warnings
    })

    machineMonitor().then(res => {
      let ms = []
      if (res.data.normalMachines) ms = res.data.normalMachines
      if (res.data.warningMachines) {
        const warningsMachines = res.data.warningMachines.map(p => {
          return { ...p, warning: true }
        })
        console.log(ms, warningsMachines)
        ms = [...ms, ...warningsMachines]
      }
      this.list = ms
      this.totalMachine = ms.length
    })

    operatorMonitor().then(res => {
      this.operators = res.data.normalOperators
      this.totalOperator = res.data.normalNum
    })

    totalData().then(res => {
      this.totalData = res.data.totalData
    })

    totalTask().then(res => {
      this.totalTask = res.data.totalTask
    })
  },
  methods: {
    handleEdit(scope) {
      this.eventData = scope.row
      this.dialogVisible = true
      this.checkStrictly = true
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss">
.card-height2 {
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
