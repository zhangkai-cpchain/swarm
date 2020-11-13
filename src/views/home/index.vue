<template>
  <div>
    <header>
      <div class="logo-area">
        <img src="@/assets/logo.png" alt="" srcset="" class="logo">
        <h3> 中国船舶第七一六研究所</h3>
      </div>
      <div class="login">
        <el-button type="text" @click="registerDialogFormVisible = true">注册</el-button>
        <el-button type="text" @click="loginDialogFormVisible = true">登录</el-button>
      </div>
    </header>

    <div>
      <el-carousel trigger="click" type="card" height="350px">
        <el-carousel-item v-for="item in 10" :key="item" class="carousel">
          <img src="@/assets/main.png" style="width:100%">
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-row :gutter="8" class="f-container">
      <el-col :xs="{span: 24}" :sm="{span: 22}" :md="{span: 18}" :lg="{span: 16}" :xl="{span: 14}">
        <div class="panel-group">
          <a href="#/swarm/manage">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-people">
                <i class="iconfont icon-jiaoyijilu" class-name="card-panel-icon" style="font-size: 48px;" />
              </div>
              <p>无人集群管理</p>
              <div class="card-panel-description">
                <div class="card-panel-text">向无人集群发布指令
                  查询任务结果</div>
              </div>
            </div>
          </a>
          <a href="#/swarm/query">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper  icon-message">
                <i class="iconfont icon-data" class-name="card-panel-icon" style="font-size: 48px;" />
              </div>
              <p>数据查询服务</p>
              <div class="card-panel-description">
                <div class="card-panel-text">查询无人集群传感器数据 </div>
              </div>
            </div>
          </a>
          <a href="">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
                <i class="iconfont icon-shebei" class-name="card-panel-icon" style="font-size: 48px;" />
              </div>
              <p>区块链状态监控</p>
              <div class="card-panel-description">
                <div class="card-panel-text">实时监控链上状态
                  数据可视化
                </div>
              </div>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>

    <footer>

      <div class="contact">
        <img src="@/assets/logo.png" alt="" srcset="" class="logo">
        <h3> 中国船舶第七一六研究所上海分部</h3>
        <div class="other" />
      </div>
      <div class="copyright">
        <p>版权所有</p>
      </div>

    </footer>
    <el-dialog width="550px" :visible.sync="registerDialogFormVisible">
      <Register @close="registerDialogFormVisible=false" />
    </el-dialog>
    <el-dialog width="550px" :visible.sync="loginDialogFormVisible">
      <Login @close="loginDialogFormVisible=false" />
    </el-dialog>

  </div>
</template>

<script>
import Register from './pop/register'
import Login from './pop/login'
export default {
  components: { Register, Login },
  data() {
    return {
      loginDialogFormVisible: false,
      registerDialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>
<style lang="scss">
.el-dialog {
  border-radius: 12px;
}
.copyright {
  p {
    margin: 0 !important;
  }
}
.carousel {
  // width: 100%;
  // display: flex;
  // justify-content: center;
  background: #34bfa3;
}
.logo {
  height: 40px;
  // width: 40px;
  margin-right: 20px;
}
footer {
  height: 100px;
  background: #475669;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .contact {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    h3: {
      font-size: 30px;
    }
  }
}
header {
  padding: 0 50px;
  height: 60px;
  background: #475669;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo-area {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    img: {
      // height: 50px;
    }
    h3: {
      font-size: 30px;
    }
  }
}
.f-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 400px;
}

.el-row {
  padding: 0 !important;
  margin: 0 !important;
}

.el-col {
  padding: 0 !important;
  margin: 0 !important;
}

.panel-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 48px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    width: 248px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    p {
      font-size: 24px;
      text-align: center;
    }

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
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      width: 100%;
      height: 100%;
      margin: 0 !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 26px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        text-align: center;
        width: 60%;
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
