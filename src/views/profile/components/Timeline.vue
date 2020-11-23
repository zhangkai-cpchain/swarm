<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of historyRev" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.operation | operationName }}</h4>
          <p v-if="item.machineIds" class="log">操作对象: <em>{{ item.machineIds.join(',') }}</em></p>
          <p class="log">操作时间: <em>{{ item.time | parseTime }}</em>
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      default: () => {
        return [
          { operation: 'sensor', machineIds: ['ss'], time: 2345234534 },
          { operation: 'detect', machineIds: ['ss', 'aa'], time: 2345234534 },
          { operation: 'data', machineIds: ['ss'], time: 2345234534 }
        ]
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    historyRev() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const res = this.history.sort((x, y) => -1)
      return res
    }
  }
}
</script>

 <style lang="scss" scoped>
.log {
  font-weight: 400;
  font-size: 14px;

  em {
    margin-left: 10px;
    color: #999999;
    font-size: 14px;
  }
}
</style>
