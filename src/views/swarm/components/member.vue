<template>
  <el-card shadow="hover" :class="'box-card '">
    <section class="header">
      <el-avatar :size="'large'" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      <el-tag size="mini" :type="'info'" style="margin-top:4px">user</el-tag>
    </section>
    <el-form :label-position="'left'" label-width="80px" class="body">
      <el-form-item label="权限等级">
        <span>{{ item.type }}</span>
      </el-form-item>
      <el-form-item label="监控状态">
        <el-tag size="medium" effect="dark" :type="'success'" style="margin-top:4px">正常</el-tag>
      </el-form-item>

    </el-form>

  </el-card>
</template>

<script>
export default {
  name: 'Member',
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
  computed: {
    headerClass() {
      const className = ''
      switch (this.item.status) {
        case 'free': break
        case 'task': break
        case 'fault': break
      }
      return className
    }
  }
}
</script>
<style  lang="scss"  >
.box-card {
  // margin-top: 20px;
  .el-card__body {
    display: flex;
    flex-direction: row;
    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      p {
        margin: 0;
      }
    }
  }
}
.body {
  padding: 0 20px;
}
</style>
