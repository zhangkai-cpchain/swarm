<template>
  <div class="l-main">
    <card
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :type="'tx'"
      :fade="fade"
    />
  </div>
</template>

<script>

import pump from '../data/pump'
import card from './card'
import { showBlocksCount } from '../../../utils/variables'
export default {
  name: 'Txs',
  components: { card },
  data () {
    return {
      fade: true,
      list: []
    }
  },
  created () {
    pump.txs.subscribe(item => {
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
  // background-color: tan;
}
</style>
