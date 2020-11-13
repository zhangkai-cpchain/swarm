<template>
  <div class="bar-content">
    <div class="edge edge-left" />
    <div class="center-bar">{{ big_dashboard_title }}</div>
    <div class="edge edge-right">
      <div class="time">{{ time| parseTime('{h}:{i}:{s}') }}</div>
      <!-- <div class="date">{{ time| parseTime('{y}-{m}-{d} {h}:{i}') }}</div> -->
    </div>
  </div>
</template>

<script>
import { getConfig } from '@/api/user'
export default {
  name: 'TopBar',
  data() {
    return {
      time: Date.now(),
      big_dashboard_title: '无人集群数据监控大屏'
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.time = this.time + 1000
    }, 1000)
    getConfig().then(res => {
      this.big_dashboard_title = res.big_dashboard_title
    })
  },
  beforeDestroy() {
    this.interval && clearInterval(this.interval)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "SourceHanSansCN-Medium", "SourceHanSansCN";
  border-bottom: 0.03vh solid #00507a;
  .edge {
    width: 9.236vw;
  }

  .edge-left {
    padding-left: 2.743vw; //5760
    img {
      width: 6.49vw;
    }
  }

  .edge-right {
    padding-right: 1.5vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .time {
      font-size: 1vw;
      font-family: "roboto";
      font-weight: 400;
      color: rgba(248, 252, 255, 1);
    }

    .date {
      font-size: 0.69444vw;
      font-family: "roboto";
      font-weight: 400;
      color: rgba(248, 252, 255, 1);
      line-height: 1.0416666vw;
    }
  }

  .center-bar {
    font-size: 1.5vw;
    font-family: "SourceHanSansCN-Medium", "SourceHanSansCN";
    font-weight: 400;
    color: rgba(248, 252, 255, 1);
    line-height: 3.125vw;
    display: flex;
    align-items: center;

    img {
      width: 2.64vw;
      height: 2.482vw;
      margin-right: 0.4vw;
    }
  }
}
</style>
