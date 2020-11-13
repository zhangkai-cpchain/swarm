<template>
  <el-form>
    <el-form-item label="旧密码">
      <el-input v-model.trim="user.oldPassword" type="password" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model.trim="user.newPassword" type="password" />
    </el-form-item>
    <el-form-item label="重复新密码">
      <el-input v-model.trim="repeatPassword" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { changePassword } from '@/api/user'
export default {
  props: {

  },
  data () {
    return {
      repeatPassword: '',
      user: {
        newPassword: '',
        oldPassword: ''

      }
    }
  },
  methods: {
    submit () {
      if (!this.user.newPassword || !this.user.oldPassword || !this.repeatPassword) {
        this.$message({
          message: '请输入密码',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (this.user.newPassword !== this.repeatPassword) {
        this.$message({
          message: '两次输入密码不同',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      changePassword(this.user).then(val => {
        if (val.id) {
          this.$message({
            message: '修改成功！',
            type: 'success',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>
