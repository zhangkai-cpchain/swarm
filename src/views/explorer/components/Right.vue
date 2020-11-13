<template>
  <div class="r-main">
    <div class="row">
      <div>
        <p>合约数据</p>
      </div>
    </div>

    <div class="row">
      <span>时间</span>
      <span>余额</span>
      <span>冻结金额</span>
      <span>总电量</span>
    </div>
    <div
      v-for="(item,i) in list"
      :key="i"
      class=" row"
    >
      <span>{{ item.timestamp | parseTime("{h}:{i}:{s}") }}</span>
      <span>{{ item.balance }}</span>
      <span>{{ item.freeze }}</span>
      <span>{{ item.totalPower }}</span>
    </div>
  </div>
</template>

<script>
import pump from '../data/pump'
import { showContractDataCount } from '../../../utils/variables'
import { getContractDataFields } from '@/api/contract'
const TLV = require('node-tlv')
export default {
  name: 'Center',
  data() {
    return {
      list: [],
      tlvArr: []
    }
  },
  async created() {
    await this.getFields()

    this.qingshuichi_output_water_ph = pump.contract_data.subscribe(element => {
      if (!element) return

      const tlv = TLV.parse(element.tlv)
      this.tlvArr.forEach(t => {
        const tagHex = t.tag < 16 ? '0' + t.tag.toString(16) : t.tag.toString(16)

        const tlv_sub = tlv.find(tagHex)
        if (!tlv_sub) return
        try {
          switch (t.type) {
            case 'NUMBER':
              element[t.name] = Buffer.from(tlv_sub.value, 'hex').readFloatBE(0).toFixed(t.precision || 2)
              break
            case 'TIMESTAMP':
              element[t.name] = Buffer.from(tlv_sub.value, 'hex').readIntBE(0)
              break
            default:
              element[t.name] = Buffer.from(tlv_sub.value, 'hex').toString()
          }
        } catch (error) {
          console.log(error)
        }
      })

      this.list.unshift(element)

      if (this.list.length > showContractDataCount) { this.list.pop() }
      setTimeout(() => {
        this.fade = false
      }, 1000)
    })
  },
  methods: {
    async getFields() {
      const response = await getContractDataFields()
      response.forEach(element => {
        if (element.tag !== -1) {
          this.tlvArr.push(element)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.r-main {
  height: 100%;
  width: 100%;
  border-left: 0.01vh solid #00507a;
  overflow: hidden;

  // background-color: blue;
}
.row {
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  margin: 3px;
  display: flex;
  box-shadow: rgba(10, 114, 212, 0.2) 0 0 3px;
  background: rgba(10, 54, 112, 0.2);
  p {
    font-size: 16px;
    color: rgba($color: #ffffff, $alpha: 1);
    width: 100%;
    text-align: center;
  }
  span {
    width: 25%;
    font-size: 14px;
    color: rgba($color: #dddddd, $alpha: 1);
    text-align: center;
  }

  & :first-child {
    text-align: left;
  }
  & :last-child {
    text-align: right;
  }
  // .s1 {
  //   width: 33%;
  //   font-size: 14px;
  //   color: rgba($color: #ffffff, $alpha: 0.8);
  //   text-align: left;
  // }
  // .s2 {
  //   width: 33%;
  //   font-size: 14px;
  //   color: rgba($color: #ffffff, $alpha: 0.8);
  //   text-align: right;
  // }
  // .s3 {
  //   width: 33%;
  //   font-size: 14px;
  //   color: rgba($color: #ffffff, $alpha: 0.8);
  //   text-align: right;
  // }
}
</style>
