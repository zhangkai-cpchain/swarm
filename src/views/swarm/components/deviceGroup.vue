<template>
  <section class="items">
    <Card v-for="(item,i) in list" :key="i" :item="item" @change="change" />
  </section>
</template>

<script>
import Card from './Card'
export default {
  components: { Card },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      selected: []
    }
  },
  watch: {
    list(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    change(item, checked) {
      console.log(item, checked)
      if (checked) this.selected.push(item)
      else this.selected = this.selected.filter(p => p.machineId !== item.machineId)
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style>
</style>
