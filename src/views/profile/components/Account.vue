<template>
  <el-form :label-position="'left'" label-width="100px">
    <el-form-item label="用户ID">
      <span>{{ user.userId }}</span>
    </el-form-item>
    <el-form-item label="所属部门">
      <span>{{ user.department }}</span>
    </el-form-item>
    <el-form-item label="权限等级">
      <span>{{ user.role | roleName }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
// import { getPermissions } from '@/api/role'
// import store from '@/store'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          userId: '1',
          department: 'shanghai',
          role: '1'
        }
      }
    }
  },
  data() {
    return {
      permissions: [],
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'description'
      }
    }
  },
  created() {
    // this.getPermissions()

    // this.$nextTick(() => {
    //   const permissions = store.getters && store.getters.permissions
    //   const permissionsId = permissions.map(p => p.id)
    //   this.$refs.tree.setCheckedKeys(permissionsId)
    //   this.checkStrictly = false
    // })
  },
  methods: {
    async getPermissions() {
      // const res = await getPermissions()
      // this.permissions = res.content.map(p => { return { ...p, disabled: true } })
    },
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
<style lang="scss"  >
.permission-tree {
  margin-top: 50px;
}
</style>
