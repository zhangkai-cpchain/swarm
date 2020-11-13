<template>
  <div class="app-container">
    <div v-stage="2" class="filter-container flex-row">
      <el-input v-model="listQuery.hash" clearable placeholder="请输入设备ID/数据类型/关键词" class="filter-item" style="margin-right: 20px; width: 400px" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        下载
      </el-button>
    </div>

    <!-- <div class="filter-container">
      <el-checkbox-group v-model="formThead">
        <el-checkbox v-for="(name, i) of labelMap" :key="i" :label="i" />
      </el-checkbox-group>
    </div> -->

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @sort-change="sortChange">
      <el-table-column label="序号/选择" prop="number" align="center" width="100" :class-name="getSortClass('number')">
        <template slot-scope="{ row }">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit" :width="labelMap[fruit].width">
        <template slot-scope="scope">
          <div v-if="labelMap[fruit].type === 'time'">
            {{ scope.row[labelMap[fruit].name] | parseTime("{y}-{m}-{d} {h}:{i}") }}
          </div>
          <div v-else-if="labelMap[fruit].click" class="link-type" @click="labelMap[fruit].click(scope.row)">
            {{ scope.row[labelMap[fruit].name] }}
          </div>
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
    </el-dialog> -->
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import stage from '@/directive/stage'
import qs from 'qs'
// eslint-disable-next-line no-unused-vars
import { parseTime } from '@/utils'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves, stage },
  data() {
    return {
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
      // detailThead: [
      //   '联盟',
      //   '交易数量',
      //   '区块哈希',
      //   '数据哈希',
      //   '创建时间',
      //   '上一区块'
      // ],
      formThead: [
        '数据类型',
        '数据标签',
        '数据大小',
        '更新时间',
        '设备类型',
        '设备ID',
        '密级'
      ],
      labelMap: {
        '数据类型': { name: 'a' },
        '数据标签': { name: 'b' },
        '数据大小': { name: 'bb' },
        '更新时间': { name: 'c' },
        '设备类型': { name: 'd' },
        '设备ID': { name: 'e' },

        '密级': { name: 'f' }

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true

      setTimeout(() => {
        this.list = [{
          number: 1,
          a: '图像',
          b: '海上、舰船',
          bb: '178KB',
          c: '2020/10/10 10:10:10',
          d: 'UAV',
          e: 'xxxxxxxxxxxxx',
          f: '1'
        },
        {
          number: 2,
          a: '图像',
          b: '海上、舰船',
          bb: '178KB',
          c: '2020/10/10 10:10:10',
          d: 'UAV',
          e: 'xxxxxxxxxxxxx',
          f: '1'
        },
        {
          number: 3,
          a: '图像',
          b: '海上、舰船',
          bb: '178KB',
          c: '2020/10/10 10:10:10',
          d: 'UAV',
          e: 'xxxxxxxxxxxxx',
          f: '1'
        },
        {
          number: 4,
          a: '图像',
          b: '海上、舰船',
          bb: '178KB',
          c: '2020/10/10 10:10:10',
          d: 'UAV',
          e: 'xxxxxxxxxxxxx',
          f: '1'
        },
        {
          number: 5,
          a: '图像',
          b: '海上、舰船',
          bb: '178KB',
          c: '2020/10/10 10:10:10',
          d: 'UAV',
          e: 'xxxxxxxxxxxxx',
          f: '1'
        },
        {
          number: 6,
          a: '图像',
          b: '海上、舰船',
          bb: '178KB',
          c: '2020/10/10 10:10:10',
          d: 'UAV',
          e: 'xxxxxxxxxxxxx',
          f: '1'
        },
        {
          number: 7,
          a: '图像',
          b: '海上、舰船',
          bb: '178KB',
          c: '2020/10/10 10:10:10',
          d: 'UAV',
          e: 'xxxxxxxxxxxxx',
          f: '1'
        }
        ]
        this.listLoading = false
      }, 0.2 * 1000)
      // getBlockList({
      //   ...this.listQuery,
      //   page: this.listQuery.page > 0 ? this.listQuery.page - 1 : 0
      // }).then((response) => {
      //   this.list = response.content
      //   this.total = response.totalElements

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 0.2 * 1000)
      // })
    },
    handleDownload() {
      const query = {}
      this.start_at_local &&
        (query.start_at = new Date(this.start_at_local).getTime())
      this.end_at_local &&
        (query.end_at = new Date(this.end_at_local).getTime())
      location.href = process.env.VUE_APP_BASE_API + 'chain/blocks/export/?' + qs.stringify(query)
    },
    handleFetchBlcok(block) {
      this.block = block
      this.dialogPvVisible = true
    },
    handleFilter() {
      this.listQuery.page = 0
      this.start_at_local &&
        (this.listQuery.start_at = new Date(this.start_at_local).getTime())
      this.end_at_local &&
        (this.listQuery.end_at = new Date(this.end_at_local).getTime())
      console.log(this.listQuery)
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
