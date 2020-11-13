<template>
  <div>
    <el-form :model="form">
      <div class="logo2-container">
        <img src="@/assets/logo2.png" alt="" class="logo2">
      </div>

      <el-divider content-position="center">请填写必要信息</el-divider>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <div class="row">
          <el-input v-model="passwd" type="password" autocomplete="off" />
          <el-button v-if="form.keystore" style="margin:10px 0" :loading="generating" type="primary" @click="sequenceDownload">{{ '下载密钥' }}</el-button>
          <el-button v-else style="margin:10px 0" :loading="generating" type="primary" @click="generateKeyPairHex">{{ '生成并下载密钥' }}</el-button>
        </div>

      </el-form-item>
      <el-form-item label="证明文件" :label-width="formLabelWidth">
        <input type="file" style="" @change="uploadImg($event, 1)">
      </el-form-item>
      <el-form-item label="权限等级" :label-width="formLabelWidth">
        <el-select v-model="form.role" placeholder="权限等级">
          <el-option label="一级" value="1" />
          <el-option label="二级" value="2" />
          <el-option label="三级" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.userName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer submit">
      <el-button type="primary" :disabled="!(form.keystore&&form.role&&form.userName)" @click="registerAndLogin">提交注册</el-button>
    </div>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import { Message } from 'element-ui'
// import { register } from '@/api/user'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwd: '',
      form: {
        keystore: '',
        role: '',
        publicKey: '',
        userName: ''
      },
      formLabelWidth: '100px',
      generating: false
    }
  },
  methods: {
    registerAndLogin() {
      // register(this.form).then(res => {
      //   console.log(res)
      // })
      setTimeout(() => {
        Message({
          message: '注册成功',
          type: 'success',
          duration: 3 * 1000
        })
        this.$router.push('/profile')
      }, 2000)
    },
    close() {
      this.$emit('close')
    },
    generateKeyPairHex() {
      if (!this.passwd) {
        Message({
          message: '必须输入密码才能生成密钥',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      this.generating = true
      const wallet = ethers.Wallet.createRandom()
      this.form.publicKey = wallet.publicKey
      wallet.encrypt(this.passwd, { N: 2 ** 18 }).then(keystore => {
        this.form.keystore = keystore
        console.log(keystore)
        this.sequenceDownload()
        this.generating = false
      })
      console.log(wallet)
    },
    sequenceDownload() {
      const json = JSON.parse(this.form.keystore)
      delete (json['x-ethers'])
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)))
      element.setAttribute('download', json.address + '.keystore')
      element.style.display = 'none'
      element.click()
    }
  }
}
</script>

<style>
.logo2-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
}
.submit {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.logo2 {
  height: 80px;
}
</style>
