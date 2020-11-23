<template>
  <div class="warning-main">
    <section v-if="warning.object==='operator'" class="forms1">
      <h2>基本信息</h2>
      <el-form :label-position="'left'" size="mini" label-width="120px" class="body" style="margin-left:50px">
        <el-form-item label="用户ID:">
          <span>{{ basicInfo.userId }}</span>
        </el-form-item>
        <el-form-item label="所属部门:">
          <span>{{ basicInfo.department }}</span>
        </el-form-item>
        <el-form-item label="权限等级:">
          <span>{{ basicInfo.role | roleName }}</span>
        </el-form-item>
      </el-form>
    </section>
    <section v-else class="forms1">
      <h2>基本信息</h2>
      <section class="forms" style="margin-left:50px">
        <el-form :label-position="'left'" size="mini" label-width="80px" class="body">
          <el-form-item label="类型:">
            <span>{{ basicInfo.type }}</span>
          </el-form-item>
          <el-form-item label="编号:">
            <span>{{ basicInfo.machineId }}</span>
          </el-form-item>
          <el-form-item label="状态:">
            <span>{{ basicInfo.machineStatus | machineStatus }}</span>
          </el-form-item>
        </el-form>
        <el-form :label-position="'left'" size="mini" label-width="80px" class="body">
          <el-form-item label="位置:">
            <span>{{ basicInfo.qps }}</span>
          </el-form-item>
          <el-form-item label="规格:">
            <span>{{ basicInfo.size }}</span>
          </el-form-item>
          <el-form-item label="注册:">
            <span>{{ basicInfo.registerTime | parseTime }}</span>
          </el-form-item>
        </el-form>
      </section>
    </section>

    <div class="line">
      <h2>预警详情</h2>
      <section style="margin-left:50px">
        <el-timeline>
          <el-timeline-item v-for="(item,i) in history" :key="i" :hide-timestamp="true" :type="'danger'">
            <div class="warning-content">
              <h4>{{ item.warningContent }}</h4>
              <p class="log">
                操作对象:
                <em v-if="warning.object==='operator'">{{ item.fileName }}</em>
                <em v-else>{{ item.commander }}</em>
              </p>
              <p class="log">
                操作时间:
                <em>{{ item.time | parseTime }}</em>
              </p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </section>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="clear">清除预警</el-button>
      <el-button type="danger" @click="banObject">撤销证书</el-button>
    </div>
  </div>
</template>

<script>
import {
  warningOperatorDetail,
  warningMachineDetail,
  cleanWarning,
  banObject
} from '@/api/swarm'
import { Message } from 'element-ui'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    warning: Object,
    default: () => {
      return {

      }
    }
  },
  data() {
    return {
      loading: false,
      basicInfo: {},
      history: []
    }
  },
  watch: {
    warning: {
      handler(n, o) {
        console.log(n, o)
        if (n.object === 'machine') {
          warningMachineDetail({ warningId: n.warningId }).then(res => {
            console.log(res)
            this.basicInfo = res.data.basicInfo
            this.history = res.data.history
          })
        } else {
          warningOperatorDetail({ warningId: n.warningId }).then(res => {
            this.basicInfo = res.data.basicInfo
            this.history = res.data.history
          })
        }
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  },
  created() { },
  methods: {
    banObject() {
      console.log('ban')
      banObject({ objectId: this.warning.objectId }).then(res => {
        if (res.errorMsg) {
          Message({
            message: res.errorMsg,
            type: 'error',
            duration: 2 * 1000
          })
          return
        } else {
          Message({
            message: '操作成果!',
            type: 'success',
            duration: 2 * 1000
          })
          this.$emit('close')
        }
      })
    },
    clear() {
      cleanWarning({ warningId: this.warning.warningId }).then(res => {
        if (res.errorMsg) {
          Message({
            message: res.errorMsg,
            type: 'error',
            duration: 2 * 1000
          })
          return
        } else {
          Message({
            message: '操作成果!',
            type: 'success',
            duration: 2 * 1000
          })
          this.$emit('close')
        }
      })
    }
  }
}
</script>

 <style lang="scss">
.warning-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .forms1 {
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    width: 100%;
    .body .el-form-item {
      margin-bottom: 2px;
    }
  }
  .forms {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 40px;
    .body .el-form-item {
      margin-bottom: 2px;
    }
  }
}

.warning-container {
  .el-dialog__body {
    padding: 20px 20px;
  }
}
.line {
  // height: 300px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  width: 100%;
}

.warning-content {
  padding-bottom: 16px;
  h4 {
    margin-top: 0 !important;
    color: #f56c6c;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px !important;
  }
  p {
    margin: 0 !important;
  }

  em {
    margin-left: 10px;
    color: #999999;
    font-size: 14px;
  }
}
h2 {
  margin: 0;
  widows: 120px;
}
</style>
