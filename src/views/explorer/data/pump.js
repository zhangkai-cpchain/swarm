import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { showBlocksCount, showChartDataCount, showContractDataCount } from '../../../utils/variables'
// import { interval } from 'rxjs'
// import { map } from 'rxjs/operators'
class Pump {
  /**
   * org_id 切换除非重新查询
   */
  org_id = new BehaviorSubject(0)

  /**
   * 区块列表
   */
  blocks = new ReplaySubject(showBlocksCount)

  /**
   * 交易列表
   */
  txs = new ReplaySubject(showBlocksCount)

  /**
   * 合约数据
   */
  contract_data = new ReplaySubject(showContractDataCount)

   data = new ReplaySubject(showContractDataCount)

  /**
   * 概述
   */
  dataCount = new BehaviorSubject(0)
  blockCount = new BehaviorSubject(0)
  txCount = new BehaviorSubject(0)
  deviceCount = new BehaviorSubject(0)
  peerCount = new BehaviorSubject(0)
  taskCount = new BehaviorSubject(0)

  bar_data = new ReplaySubject(showChartDataCount)

  constructor() {
    console.log('init')
    // TEST DATA
    // interval(1000).pipe(
    //   map(x => {
    //     return [Date.now(), x << 1]
    //   })
    // ).subscribe(val => {
    //   this.bar_data.next(val)
    // })

    // interval(1000).pipe(
    //   map(x => {
    //     return {
    //       balance: 0,
    //       createdAt: 1603776810077,
    //       devId: 'devid',
    //       freeze: 0,
    //       iccid: '89860310707694224144',
    //       id: 12,
    //       imei: '861989047888436',
    //       rate1Power: 0,
    //       rate2Power: 0,
    //       rate3Power: 0,
    //       rate4Power: 0,
    //       tlv: 'E13301044647DF29020443C6799A03044090A3D7040442DE6B850504435335C30604439B9AE1070443CD9AE1080753554343455353',
    //       totalPower: 0,
    //       updatedAt: 1603776810077
    //     }
    //   })
    // ).subscribe(val => {
    //   this.contract_data.next(val)
    // })
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new Pump()
    }
    return this.instance
  }
}

export default Pump.getInstance()
