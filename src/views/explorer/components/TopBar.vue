<template>
  <div class="bar-content">
    <div class="edge edge-left">
      <a href="#/"> <img src="@/assets/u86.png" style="width:30px;height:24px"></a>
    </div>
    <div class="center-bar">{{ big_dashboard_title }}</div>
    <div class="edge edge-right">
      <div class="time">{{ time| parseTime('{h}:{i}:{s}') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      time: Date.now(),
      big_dashboard_title: '无人集群数据监控大屏',
      dashboardLogoTitle: '',
      loaded: false
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.time = this.time + 1000
    }, 1000)

    // getConfig().then(res => {
    //   this.big_dashboard_title = res.big_dashboard_title
    //   this.dashboardLogoTitle = instance.getImg(res.big_dashboard_logo_title)
    //   this.loaded = true
    // })
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
  border-bottom: 1px solid #00507a;
  // margin-bottom: 4px;
  .edge {
    width: 9.236vw;
  }

  .edge-left {
    padding-left: 12px; //5760
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
      font-size: 20px;
      font-weight: 700;
      color: rgba(248, 252, 255, 1);
    }

    .date {
      font-size: 0.69444vw;
      font-weight: 400;
      color: rgba(248, 252, 255, 1);
      line-height: 1.0416666vw;
    }
  }

  .center-bar {
    font-size: 24px;
    font-weight: 700;
    color: rgba(248, 252, 255, 1);
    line-height: 3.125vw;
    display: flex;
    align-items: center;

    img {
      // width: 2.64vw;
      height: 6.5vh;
      // margin-right: 0.4vw;
    }
  }
}
</style>
