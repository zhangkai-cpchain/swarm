<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="18" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <account :user="user" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="18" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>历史日志</span>
            </div>
            <timeline />
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
export default {
  name: 'Profile',
  components: { Account, Timeline },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    console.log(this.roles)
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.map(p => p.name).join(' | ')
        // email: 'admin@test.com',
        // avatar: this.avatar
      }
    }
  }
}
</script>
