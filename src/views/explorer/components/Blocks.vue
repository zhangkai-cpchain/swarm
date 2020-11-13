<template>
  <div id="blocks" class="l-main">
    <card
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :type="'block'"
      :fade="fade"
    />
  </div>
</template>

<script>

import pump from '../data/pump'
import card from './card'
import { showBlocksCount } from '../../../utils/variables'

export default {
  name: 'Blocks',
  components: { card },
  data () {
    return {
      fade: true,
      list: []
    }
  },
  created () {
    pump.blocks.subscribe(item => {
      if (!item) return

      this.fade = true
      this.list.unshift(item)
      if (this.list.length > showBlocksCount) {
        this.list.pop()
      }
      setTimeout(() => {
        this.fade = false
      }, 1000)
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.l-main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background-color: brown;
}
</style>
