<template>
  <div class="app-container">
    <div v-stage="2" class="filter-container flex-row">
      <el-input v-model="keys" clearable placeholder="请输入设备ID/数据类型/关键词" class="filter-item" style="margin-right: 20px; width: 400px" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">下载</el-button>
    </div>

    <!-- <div class="filter-container">
      <el-checkbox-group v-model="formThead">
        <el-checkbox v-for="(name, i) of labelMap" :key="i" :label="i" />
      </el-checkbox-group>
    </div>-->

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column label="选择" type="selection" :selectable="levelCheck" width="55" />
      <el-table-column label="序号" prop="number" align="center" width="100" :class-name="getSortClass('number')">
        <template slot-scope="{ row }">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit" :width="labelMap[fruit].width">
        <template slot-scope="scope">
          <div v-if="labelMap[fruit].type === 'time'">{{ scope.row[labelMap[fruit].name] | parseTime }}</div>
          <div v-else-if="labelMap[fruit].type === 'level'">{{ scope.row[labelMap[fruit].name] | roleName }}</div>

          <div v-else-if="labelMap[fruit].type === 'devType'">{{ scope.row[labelMap[fruit].name] | devName }}</div>
          <div v-else-if="labelMap[fruit].click" class="link-type" @click="labelMap[fruit].click(scope.row)">{{ scope.row[labelMap[fruit].name] }}</div>
          <div v-else>{{ scope.row[labelMap[fruit].name] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- <el-dialog :width="'700px'" :visible.sync="dialogPvVisible" title="区块详情">
      <el-form ref="dataForm" label-position="left" label-width="100px" style="width: 600px; margin-left: 50px">
        <el-form-item v-for="(item, i) in detailThead" :key="i" :label="item" prop="channel">
          <el-input v-if="labelMap[item].type === 'time'" :value="block[labelMap[item].name] | parseTime('{y}-{m}-{d} {h}:{i}')" readonly />
          <el-input v-else v-model="block[labelMap[item].name]" readonly />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import stage from '@/directive/stage'
import { latestData, queryData } from '@/api/swarm'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves, stage },
  data() {
    return {
      multipleSelection: [],
      keys: '',
      downloadLoading: false,
      end_at_local: '',
      start_at_local: '',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogPvVisible: false,
      block: {},
      formThead: [
        '数据类型',
        '文件名',
        '数据大小',
        '更新时间',
        '设备类型',
        '设备ID',
        '密级'
      ],
      labelMap: {
        数据类型: { name: 'dataType' },
        文件名: { name: 'fileName' },
        数据大小: { name: 'size' },
        更新时间: { name: 'time', type: 'time' },
        设备类型: { name: 'machinetype', type: 'devType' },
        设备ID: { name: 'machineId' },

        密级: { name: 'level', type: 'level' }
      }
    }
  },
  computed: {
    keywords() {
      if (this.keys) {
        return this.keys.split(' ')
      } else {
        return []
      }
    },
    ...mapGetters(['roles'])
  },
  created() {
    latestData().then(res => {
      console.log(res)
      if (res.data && res.data.latestData) {
        const array = res.data.latestData
        for (let index = 0; index < array.length; index++) {
          const element = array[index]
          element.number = index + 1
          element.size = element.size + 'kb'
        }
        this.list = array
      }

      this.listLoading = false
    })
    // this.getList()
  },

  methods: {
    levelCheck(row, index) {
      if (this.roles && this.roles <= row.level) { return true } else return false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      this.listLoading = true
      queryData({ keywords: this.keywords })
        .then(res => {
          const array = res.data.latestData
          for (let index = 0; index < array.length; index++) {
            const element = array[index]
            element.number = index + 1
            element.size = element.size + 'kb'
          }
          this.list = array

          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    handleDownload() {
      if (this.multipleSelection.length === 0) {
        Message({
          message: '请选择要下载的文件',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }

      this.multipleSelection.forEach(item => {
        var x = new XMLHttpRequest()
        x.open(
          'GET',
          '/api/fabricDemo/' + item.fileName,
          // "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          true
        )
        x.responseType = 'blob'
        x.onload = function (e) {
          var url = window.URL.createObjectURL(x.response)
          var a = document.createElement('a')
          a.href = url
          a.download = ''
          a.click()
        }
        x.send()
      })
    },

    handleFilter() {
      this.listQuery.page = 0
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

<style lang="scss">
.el-icon-time {
  height: 30px !important;
}
</style>
