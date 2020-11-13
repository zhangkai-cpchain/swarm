<template>
  <div class="warning-main">
    <section class="forms">
      <el-form :label-position="'left'" size="mini" label-width="80px" class="body">
        <el-form-item label="类型:">
          <span>{{ item.type }}</span>
        </el-form-item>
        <el-form-item label="编号:">
          <span>{{ item.No }}</span>
        </el-form-item>
        <el-form-item label="状态:">
          <span>{{ item.status }}</span>
        </el-form-item>
      </el-form>
      <el-form :label-position="'left'" size="mini" label-width="80px" class="body">
        <el-form-item label="位置:">
          <span>{{ item.location }}</span>
        </el-form-item>
        <el-form-item label="规格:">
          <span>{{ item.spec }}</span>
        </el-form-item>
        <el-form-item label="注册:">
          <span>{{ item.regTime }}</span>
        </el-form-item>
      </el-form>
    </section>

    <div style="height: 200px;margin-bottom:40px">
      <el-steps direction="vertical" :active="1">
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" />
      </el-steps>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">清除预警</el-button>
      <el-button type="danger">撤销证书</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: '1',
          name: '无人机1',
          status: 'fault',
          type: 'UAV',
          No: '1824',
          location: '127.1',
          spec: '8086',
          regTime: '2020/10/29'
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      formLabelWidth: '100px'
    }
  },
  methods: {

  }
}
</script>

 <style lang="scss">
.warning-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .forms {
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    .form-inline {
      display: inline;
      width: 48%;
    }

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
</style>
