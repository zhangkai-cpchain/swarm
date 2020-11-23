<template>
  <div id="blocks" class="l-main">
    <card v-for="(item, index) in list" :key="index" :item="item" :type="'block'" :fade="fade" />
  </div>
</template>

<script>
import pump from '../data/pump'
import card from './card'
import { showBlocksCount } from '../../../utils/variables'

export default {
  name: 'Blocks',
  components: { card },
  data() {
    return {
      fade: true,
      list: []
    }
  },
  created() {
    pump.blocks.subscribe(item => {
      if (!item || !item.height) return
      if (this.list.length !== 0 && item.height <= this.list[0].height) return

      pump.blockCount.next(item.height)
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
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  overflow: scroll;
  // background-color: brown;
}
</style>
