<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['id'])
  },
  created() {
    // personalInfo({ userId: this.id }).then(res => {
    //   console.log("res", res);
    //   if (res.data.basicInfo.role) {
    //     store.dispatch("user/setRole", res.data.basicInfo.role);
    //   }
    // });
  }
}
</script>
