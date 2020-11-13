<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false"
               mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import router from '@/router/index'
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      routes: [
        {
          path: 'profile/index',
          name: 'admin',
          meta: { title: '个人信息', noCache: true }
        },
        {
          path: '/swarm/manage',
          name: 'manage',
          meta: { title: '集群管理', noCache: true }
        },
        {
          path: '/swarm/query',
          name: 'query',
          meta: { title: '数据查询', noCache: true }
        },
        {
          path: '/swarm/admin',
          name: 'admin',
          meta: { title: '管理员', noCache: true }
        }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    console.log(router.options.routes)
  }
}
</script>
