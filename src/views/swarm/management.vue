<template>
  <div class="app-container">
    <div class="filter-container flex-row flex-row-between">
      <section class="tags">
        <el-tag effect="dark" type="success" />
        <p>空闲</p>
        <el-tag effect="dark" type="warning" />
        <p>任务</p>
        <el-tag effect="dark" type="danger" />
        <p>故障</p>
      </section>
      <el-select v-model="value" placeholder="请选择" style="margin:0 20px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="handleTask">发布任务</el-button>
    </div>

    <!-- <section class="items">
      <Card v-for="(item,i) in list" :key="i" :item="item" />
    </section>-->

    <device-group v-model="selected" :list="list" />

    <el-dialog width="250px" :visible.sync="loading">
      <div class="loading-main">
        <i v-if="status==='PENDING'" class="el-icon-loading loading" />
        <i v-if="status==='SUCCESS'" class="el-icon-success loading success" />
        <i v-if="status==='ERROR'" class="el-icon-error loading error" />

        <p>{{ progress }}/{{ totalMachine }}</p>
        <p>任务结果</p>
        <p>{{ result || status }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DeviceGroup from './components/deviceGroup'
import waves from '@/directive/waves' // waves directive
import { createTask, checkTask, listMachines } from '@/api/swarm'
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
const sleep = t => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t)
  })
}

export default {
  name: 'Manage',
  components: { DeviceGroup },
  directives: { waves },
  data() {
    return {
      stopCheck: false,
      selected: [],
      totalMachine: 0,
      progress: 0,
      loading: false,
      status: 'PENDING',
      result: '',
      options: [
        {
          value: '1',
          label: '目标识别'
        },
        {
          value: '2',
          label: '拍照'
        },
        {
          value: '3',
          label: '侦查'
        },
        {
          value: '4',
          label: '打击'
        }
      ],
      value: '1',
      list: [
        {
          status: '0',
          type: 'uav',
          machineId: '1824',
          gps: '127.1',
          size: '8086',
          registration: '2020/10/29'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  watch: {
    selected(val) {
      console.log(val)
    },
    loading(val) {
      this.stopCheck = !val
    }
  },
  created() {
    console.log(this.roles)
    if (this.roles !== '1' && this.roles !== '2') {
      this.$router.push({ path: '/401' })
      return
    }
    listMachines().then(res => {
      let ms = []
      if (res.data.normalMachines) ms = res.data.normalMachines
      if (res.data.warningMachines) {
        const warningsMachines = res.data.warningMachines
        console.log(ms, warningsMachines)
        ms = [...ms, ...warningsMachines]
      }
      this.list = ms
    })
  },
  methods: {
    cancelCheck() {
      clearInterval(this.timer)
    },
    async handleTask() {
      if (this.selected.length === 0) {
        Message({
          message: '请选择设备',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      this.loading = true
      this.result = ''
      this.stopCheck = false
      // const machineIds = ["312987476198"];
      const machineIds = this.selected.map(p => p.machineId)
      this.totalMachine = machineIds.length

      const createResult = await createTask({ machineIds })

      console.log(createResult)

      // this.timer = setInterval(async () => {
      //   this.status = "PENDING";
      //   const checkResult = await checkTask({
      //     taskId: createResult.data.taskId
      //   });
      //   this.progress = checkResult.data.progress;
      //   this.status = checkResult.data.status;
      //   if (checkResult.data.status !== "PENDING") {
      //     this.result = checkResult.data.result;
      //     this.cancelCheck();
      //   }
      // }, 2000);
      for (let i = 0; i < 100; i++) {
        this.status = 'PENDING'
        await sleep(1000)
        const checkResult = await checkTask({
          taskId: createResult.data.taskId
        })
        this.progress = checkResult.data.progress
        this.status = checkResult.data.status
        if (checkResult.data.status !== 'PENDING') {
          this.result = checkResult.data.result
          break
        }
        if (this.stopCheck) {
          break
        }
      }

      // this.loading = false
    }
  }
}
</script>

<style lang="scss">
.loading-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
}

.loading {
  font-size: 50px;
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
  // justify-content: space-between;
  padding-right: 300px;
}

.success {
  color: green;
}
.error {
  color: red;
}
</style>
