<template>
  <div class="l-main">
    <div class="card-panel-description">
      <div class="card-panel-text">区块</div>
      <count-to
        :start-val="0"
        :end-val="panelData.blockCount"
        :duration="260"
        class="card-panel-num"
      />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">交易</div>
      <count-to :start-val="0" :end-val="panelData.txCount" :duration="300" class="card-panel-num" />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">合约</div>
      <count-to
        :start-val="0"
        :end-val="panelData.dataCount"
        :duration="320"
        class="card-panel-num"
      />
    </div>
  </div>
</template>

<script>
import pump from '../data/pump'
import CountTo from 'vue-count-to'

export default {
  name: 'Center',
  components: {
    CountTo
  },
  data () {
    return {
      panelData: {
        dataCount: 0,
        blockCount: 0,
        txCount: 0
      }
    }
  },
  created () {
    pump.summary_data.subscribe(val => {
      if (!val) return
      this.panelData = val
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.l-main {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .card-panel-num {
    margin: 0 40px;
    font-size: 20px;
    color: rgba($color: #ffffff, $alpha: 1);
  }

  .card-panel-description {
    display: flex;
    flex-direction: row;
    margin: 10px;
  }

  .card-panel-text {
    font-size: 20px;
    color: rgba($color: #ffffff, $alpha: 0.7);
  }
}
</style>
