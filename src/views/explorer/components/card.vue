<template>
  <div v-if="type == 'block'" :class="fade ? 'card animate__animated animate__slideInDown' : 'card'">
    <div class="row">
      <i class="iconfont icon-data" />
      <span>{{ '' }}</span>
    </div>
    <div class="row">
      <p>#{{ item.height }}</p>
      <span>
        {{ item.txs }}
        <em>Transactions</em>
      </span>
    </div>
    <div class="row">
      <em class="hash">{{ item.blockHash }}</em>
      <span>{{ item.time | timeAgo }} ago</span>
    </div>
  </div>
  <div v-else :class="fade ? 'card animate__animated animate__slideInDown' : 'card'">
    <div class="row">
      <i class="iconfont icon-jiaoyijilu" />
      <span>{{ '' }}</span>
    </div>
    <div class="row">
      <p>#{{ item.height }}</p>
      <span>
        <em>{{ item.status }}</em>
      </span>
    </div>
    <div class="row">
      <em class="hash">{{ item.txHash }}</em>
      <span>{{ item.time | timeAgo }} ago</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Center',
  props: {
    fade: {
      type: Boolean
    },
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      i: {}
    }
  },
  mounted() {
    this.i = setInterval(() => {
      this.$forceUpdate()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.i)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.card {
  padding: 10px 16px;
  margin: 10px 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: #074566 0 0 5px;
  background: rgba(10, 114, 212, 0.2);
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    i {
      font-size: 20px;
      color: #ffffff;
    }

    span {
      font-size: 14px;
      color: rgba($color: #ffffff, $alpha: 0.8);
    }

    p {
      margin: 4px 0;
      font-size: 16px;
      color: rgba($color: #ffffff, $alpha: 1);
    }

    em {
      font-size: 12px;
      color: rgba($color: #ffffff, $alpha: 0.8);
      text-overflow: ellipsis;
    }

    .hash {
      overflow: hidden;
      width: 65%;
      text-overflow: ellipsis;
    }
  }
}
</style>
