<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="18" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <account :user="basicInfo" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="18" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>历史日志</span>
            </div>
            <timeline :history="history" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import { personalInfo } from '@/api/user'
import store from '@/store/index'
export default {
  name: 'Profile',
  components: { Account, Timeline },
  data() {
    return {
      basicInfo: {},
      activeTab: 'account',
      history: []
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  created() {
    console.log(this.roles)
    this.getUser()
  },
  methods: {
    getUser() {
      personalInfo({ userId: this.id }).then(res => {
        this.basicInfo = res.data.basicInfo
        this.history = res.data.history
        store.dispatch('user/setRole', res.data.basicInfo.role)
      })
    }
  }
}
</script>
