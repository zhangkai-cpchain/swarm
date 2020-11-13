<template>
  <div class="app-container">
    <div class="filter-container flex-row flex-row-between ">

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

    <section class="items">
      <Card v-for="(item,i) in list" :key="i" :item="item" />
    </section>

    <el-dialog width="250px" :visible.sync="loading">
      <div class="loading-main">
        <i class="el-icon-loading  loading" />
        <p>{{ progress }}/{{ totalMachine }}</p>
        <p>任务结果</p>
        <p>{{ status }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Card from './components/Card'
import waves from '@/directive/waves' // waves directive
import { createTask, checkTask } from '@/api/swarm'
const sleep = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t)
  })
}

export default {
  name: 'Manage',
  components: { Card },
  directives: { waves },
  data() {
    return {
      totalMachine: 0,
      progress: 0,
      loading: false,
      status: 'Pending',
      options: [{
        value: '1',
        label: '目标识别'
      }, {
        value: '2',
        label: '拍照'
      }, {
        value: '3',
        label: '侦查'
      }, {
        value: '4',
        label: '打击'
      }],
      value: '1',
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

      ]
    }
  },
  methods: {
    async handleTask() {
      this.loading = true
      const machineIds = ['ss', 'aa']
      this.totalMachine = machineIds.length

      const createResult = await createTask({ machineIds })

      console.log(createResult)

      for (let i = 0; i < 5; i++) {
        await sleep(1000)
        const checkResult = await checkTask({ taskId: createResult.taskId })
        this.progress = checkResult.progress
        this.status = checkResult.status
        if (checkResult.status !== 'pending') break
      }

      this.loading = false
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
</style>
