<template>
  <div>
    <div class="logo2-container">
      <img src="@/assets/logo2.png" alt="" class="logo2">
    </div>
    <div v-if="!loginType">
      <el-divider content-position="center">请选择登录方式</el-divider>
      <div class="choose" @click="loginType='local'">
        <div class="login">
          <div class="img" alt=""><span /></div>
          <span>本地登录</span>
        </div>
        <div class="login" @click="loginType='cloud'">
          <div class="img" alt=""><span /></div>
          <span>云端登录</span>
        </div>
      </div>
    </div>

    <div v-if="loginType==='local'">
      <el-form :model="form">
        <el-form-item label="Id" :label-width="formLabelWidth">
          <div class="row">
            <el-input v-model="userId" autocomplete="off" />
            <el-button style="margin:10px 0" :loading="loading" type="primary" @click="getNonce">获取Nonce</el-button>
          </div>

        </el-form-item>
        <el-form-item label="Nonce" :label-width="formLabelWidth">
          <el-input v-model="nonce" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="Keystore" :label-width="formLabelWidth">
          <input type="file" @change="tirggerFile($event)">
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer submit">
        <el-button @click="loginType=''">后退</el-button>
        <el-button type="primary" :loading="loading" :disabled="!keystore" @click="localLogin">登录</el-button>
      </div>
    </div>

    <div v-if="loginType==='cloud'">
      <el-form :model="form">
        <el-form-item label="Id" :label-width="formLabelWidth">
          <div class="row">
            <el-input v-model="userId" autocomplete="off" />
            <el-button style="margin:10px 0" :loading="loading" type="primary" @click="getNonceAndKeystore">获取Nonce</el-button>
          </div>

        </el-form-item>
        <el-form-item label="Nonce" :label-width="formLabelWidth">
          <el-input v-model="nonce" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="Keystore" :label-width="formLabelWidth">
          <el-input v-model="keystore" type="textarea" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer submit">
        <el-button @click="loginType=''">后退</el-button>
        <el-button type="primary" :loading="loading" :disabled="!keystore" @click="localLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import { Message } from 'element-ui'
import { getNonce, getNonceAndKeystore, signIn } from '@/api/user'
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      password: '',
      keystore: '',
      privateKey: '',
      token: '',
      userId: '',
      nonce: '',
      loginType: '',
      form: {
        keystore: '',
        role: '',
        publicKey: '',
        userName: ''
      },
      loading: false,
      formLabelWidth: '100px'
    }
  },
  methods: {
    tirggerFile(event) {
      // 此处校验文件后缀
      var file = event.target.files[0].name // (利用console.log输出看file文件对象)json
      var num = file.split('.')
      var mun = num[num.length - 1]
      if (mun === 'keystore') {
        this.readFile()
      } else {
        this.$Notice.error({
          title: '请重新点击选择文件传入符合标准的文件',
          duration: 2
        })
      }
    },
    readFile() {
      const fileselect = document.querySelector('input[type=file]').files[0] // 找到文件上传的元素
      const reader = new FileReader()
      // console.log(fileselect);
      if (typeof FileReader === 'undefined') {
        alert('您的浏览器不支持FileReader接口')
      }
      reader.readAsText(fileselect, 'gb2312') // 注意读取中文的是用这个编码，不是utf-8
      const self = this
      reader.onload = function () {
        self.keystore = this.result
      }
    },
    getNonceAndKeystore() {
      this.loading = true
      getNonceAndKeystore({ userId: this.userId }).then(({ data }) => {
        this.nonce = data.nonce
        this.keystore = data.keystore
        this.loading = false
      })
    },
    getNonce() {
      this.loading = true
      getNonce({ userId: this.userId }).then(({ data }) => {
        this.nonce = data
        this.loading = false
      })
    },
    async localLogin() {
      this.loading = true
      const wallet = await ethers.Wallet.fromEncryptedJson(this.keystore, this.password)
      this.token = await wallet.signMessage(this.nonce)
      console.log(this.token, wallet)
      const res = await signIn({ Id: this.userId, Token: this.token })
      console.log(res)
      this.loading = false
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

 <style lang="scss">
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
.choose {
  height: 300px;
  padding: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .login {
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    align-items: center;

    .img {
      height: 100px;
      width: 100px;
      background: #999999;
      border-radius: 50%;
      margin-bottom: 20px;
    }
  }
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -5px;
}
</style>
