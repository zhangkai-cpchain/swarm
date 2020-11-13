<template>
  <div :class="fade ? 'card animate__animated animate__slideInDown' : 'card'">
    <div class="row">
      <span class="s1">{{ item.time | parseTime("{h}:{i}:{s}") }}</span>
      <span class="s2">{{ item.price }}</span>
      <span class="s3">{{ item.val }}</span>
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
    }

  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.card {
  padding: 10px 16px;
  margin: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(10, 114, 212, 0.2) 0 0 3px;
  background: rgba(10, 54, 112, 0.2);
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;

    .s1 {
      width: 33%;
      font-size: 12px;
      color: rgba($color: #ffffff, $alpha: 0.8);
      text-align: left;
    }
    .s2 {
      width: 33%;
      font-size: 14px;
      color: rgba($color: #8f0f0f, $alpha: 1);
      text-align: right;
    }
    .s3 {
      width: 33%;
      font-size: 12px;
      color: rgba($color: #ffffff, $alpha: 0.8);
      text-align: right;
    }
  }
}
</style>
