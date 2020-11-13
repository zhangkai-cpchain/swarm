<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <a href="#/chain/blocks">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <i
              class="iconfont icon-data"
              class-name="card-panel-icon"
              style="font-size: 48px;"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">区块数量</div>
            <count-to
              :start-val="0"
              :end-val="panelData.blockCount"
              :duration="260"
              class="card-panel-num"
            />
          </div>
        </div>
      </a>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <a href="#/chain/transactions">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <i
              class="iconfont icon-jiaoyijilu"
              class-name="card-panel-icon"
              style="font-size: 48px;"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">交易数量</div>
            <count-to
              :start-val="0"
              :end-val="panelData.txCount"
              :duration="300"
              class="card-panel-num"
            />
          </div>
        </div>
      </a>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <a href="#/contracts/data">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <i
              class="iconfont icon-icon-"
              class-name="card-panel-icon"
              style="font-size: 48px;"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">上链数据</div>
            <count-to
              :start-val="0"
              :end-val="panelData.dataCount"
              :duration="320"
              class="card-panel-num"
            />
          </div>
        </div>
      </a>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <a href="#/equipment/index">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <i
              class="iconfont icon-shebei"
              class-name="card-panel-icon"
              style="font-size: 48px;"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">设备数量</div>
            <count-to
              :start-val="0"
              :end-val="panelData.deviceCount"
              :duration="360"
              class="card-panel-num"
            />
          </div>
        </div>
      </a>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    panelData: {
      type: Object,
      default: () => {
        return { blockCount: 0, dataCount: 0, deviceCount: 0, txCount: 0 }
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
