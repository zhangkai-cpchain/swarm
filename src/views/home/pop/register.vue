<template>
  <div>
    <el-form :model="form">
      <div class="logo2-container">
        <img src="@/assets/logo2.png" alt class="logo2">
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
        <input id="identification" type="file" style>
      </el-form-item>
      <el-form-item label="权限等级" :label-width="formLabelWidth">
        <el-select v-model="form.role" placeholder="权限等级">
          <el-option label="一级" value="1" />
          <el-option label="二级" value="2" />
          <el-option label="三级" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer submit">

      <el-button type="primary" :disabled="!(form.keystore&&form.role&&form.remark)" @click="registerAndLogin">提交注册</el-button>
    </div>

  </div>
</template>

<script>
import { ethers } from 'ethers'
import { Message } from 'element-ui'
import { register } from '@/api/user'
import store from '@/store/index'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: '',
      publicKey: '',
      passwd: '',
      form: {
        keystore: '',
        role: '',
        identification: '',
        remark: ''
      },
      formLabelWidth: '100px',
      generating: false
    }
  },
  methods: {
    registerAndLogin() {
      if (!document.getElementById('identification').files[0]) {
        Message({
          message: '请选择证明文件',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      // console.log(document.getElementById('identification').files[0])

      const formdata = new window.FormData()
      formdata.append('keystore', this.form.keystore)
      formdata.append('role', this.form.role)
      formdata.append('remark', this.form.remark)
      formdata.append(
        'identification',
        document.getElementById('identification').files[0]
      )

      register(formdata).then(res => {
        if (res.data) {
          this.$emit('close')
          this.id = res.data
          store.dispatch('user/setID', res.data)
          this.$confirm('注册成功，请保存好您的登录Id: ' + res.data)
            .then(_ => {
              this.$router.push('/profile')
            })
            .catch(_ => { })
          // Message({
          //   message: "注册成功",
          //   type: "success",
          //   duration: 3 * 1000
          // });
          // this.$router.push("/profile");
        }
      })
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
      this.publicKey = wallet.publicKey
      wallet.encrypt(this.passwd, { N: 2 ** 10 }).then(keystore => {
        const json = JSON.parse(keystore)
        json.publicKey = this.publicKey
        delete json['x-ethers']
        delete json['address']
        this.form.keystore = JSON.stringify(json)
        console.log(this.form.keystore)
        this.sequenceDownload(json)
        this.generating = false
      })
      console.log(wallet)
    },
    sequenceDownload(json) {
      const element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(json))
      )
      element.setAttribute('download', json.id + '.keystore')
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
