<template>
  <div class="r-main">
    <div class="row header">
      <p>合约数据</p>
    </div>

    <div class="row sub">
      <span class="cl0">时间</span>
      <span class="cl1">设备ID</span>
      <span class="cl2">数据类型</span>
      <span class="cl3">文件大小</span>
    </div>
    <div class="items">
      <div v-for="(item,i) in list" :key="i" :class="fade ? 'row animate__animated animate__slideInDown' : 'row'">
        <span class="cl0">{{ item.time | parseTime("{h}:{i}:{s}") }}</span>
        <span class="cl1">{{ item.machineId }}</span>
        <span class="cl2">{{ item.dataType }}</span>
        <a class="cl3">{{ item.size }} kb</a>
      </div>
    </div>
    <Pop v-if="dataVisible" :item="contractData" @close="dataVisible=false " />
  </div>
</template>

<script>
import pump from '../data/pump'
import { showContractDataCount } from '../../../utils/variables'
import Pop from './pop'
export default {
  name: 'Center',
  components: { Pop },
  data() {
    return {
      dataVisible: false,
      list: [],
      tlvArr: [],
      contractData: {},
      fade: true
    }
  },
  async created() {
    pump.contract_data.subscribe(element => {
      if (!element || !element.time) return
      if (this.list.length > 0 && element.time <= this.list[0].time) return
      this.list.unshift(element)
      this.fade = true
      if (this.list.length > showContractDataCount) {
        this.list.pop()
      }
      setTimeout(() => {
        this.fade = false
      }, 1000)
    })
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    showData(item) {
      this.contractData = item
      this.dataVisible = true
    },
    handleDownload(item) {
      var x = new XMLHttpRequest()
      x.open(
        'GET',
        '/api/fabricDemo/' + item.fileName,
        // "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        true
      )
      x.responseType = 'blob'
      x.onload = function (e) {
        var url = window.URL.createObjectURL(x.response)
        var a = document.createElement('a')
        a.href = url
        a.download = ''
        a.click()
      }
      x.send()
    }
  }
}
</script>
<style lang="scss" scoped>
.tlv {
  text-decoration: underline;
  text-rendering: optimizeLegibility;
  text-overflow: ellipsis;
  color: #ff9900 !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  width: 150px !important;
  overflow: hidden;
}
.r-main {
  height: 98%;
  overflow: hidden;
  margin: 10px 0;
  border-radius: 4px;
  border: 2px solid rgba(5, 62, 108, 1);
}
.row {
  height: 48px;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  padding: 0 14px;
  display: flex;
  background-color: rgba(11, 27, 72, 1);
  border-bottom: 2px solid rgba(5, 62, 108, 1);
  color: rgba($color: #ffffff, $alpha: 1);

  span {
    // width: 50%;
    font-size: 14px;
    color: rgba($color: #ffffff, $alpha: 1);
    // text-align: center;
  }
}

.header {
  height: 60px !important;
  font-size: 18px;
  font-weight: 700;
}
.sub {
  font-size: 16px;
}

.items {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
  // background: rgba(8, 36, 83, 1);
  background-color: rgba(11, 27, 72, 1);
  height: calc(94vh - 140px);
  // height: 200px;
  overflow: scroll;
}

.cl0 {
  width: 80px;
}
.cl1 {
  width: 150px;
  text-align: left;
}
.cl2 {
  width: 90px;
}
.cl3 {
  width: 90px;
  text-align: center;
}

.el-tag--medium {
  width: 88px !important;
  height: 30px !important;
  text-align: center;
  font-size: 13px !important;
}
</style>
