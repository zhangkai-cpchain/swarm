<template>
  <el-card shadow="hover" :class="'box-card '+statusCode+'-border'">
    <div slot="header" :class="statusCode+' header'">
      <span>{{ item.type | devName }}</span>
      <div class="btns">
        <el-checkbox v-if="!uncheckable" v-model="checked" style="margin-right:10px" />

        <router-link :to="{name:'device',query:{machineId:item.machineId, }}">
          <el-button type="text">详情</el-button>
        </router-link>
      </div>
    </div>
    <el-form :label-position="'left'" label-width="60px" class="body">
      <el-form-item label="类型:">
        <span>{{ item.type }}</span>
      </el-form-item>
      <el-form-item label="编号:">
        <span>{{ item.machineId }}</span>
      </el-form-item>
      <el-form-item label="状态:">
        <span>{{ item.machineStatus | machineStatus }}</span>
      </el-form-item>
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
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    uncheckable: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {
          name: '无人机1',
          status: '0',
          type: 'UAV',
          machineId: '1824',
          qps: '127.1',
          size: '8086',
          registerTime: '2020/10/29'
        }
      }
    }
  },
  data() {
    return {
      checked: false
      // statusCode: ""
    }
  },
  computed: {
    statusCode() {
      const arr = ['free', 'task', 'fault']
      if (this.item.warning) {
        return 'fault'
      } else {
        return arr[this.item.machineStatus] || 'free'
      }
    }
  },
  watch: {
    checked(val) {
      this.$emit('change', this.item, val)
    }
  },
  created() { }
}
</script>
<style  lang="scss"  >
.box-card {
  width: 280px;
  margin-top: 20px;
  .el-card__header {
    padding: 0;
  }
}
.body {
  padding: 0 20px;
  .el-form-item {
    margin-bottom: 8px;
  }
}

.header {
  padding: 18px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  span {
    color: #ffffff;
  }
}
.free {
  background: #13ce66;
}

.task {
  background: #ffba00;
}

.fault {
  background: #ff4949;
}

.free-border {
  border: 1px solid #67c23a;
}

.task-border {
  border: 1px solid #e6a23c;
}

.fault-border {
  border: 1px solid #f56c6c;
}
</style>
