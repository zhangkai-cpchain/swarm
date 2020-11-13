<template>

  <el-card shadow="hover" :class="'box-card '+item.status+'-border'">
    <div slot="header" :class="item.status+' header'">
      <span>{{ item.name }}</span>
      <div class="btns">
        <el-checkbox style="margin-right:10px" :disabled="item.status!='free'" />
        <a href="#/swarm/device">
          <el-button type="text">详情</el-button>
        </a>
      </div>

    </div>
    <el-form :label-position="'left'" label-width="80px" class="body">
      <el-form-item label="类型:">
        <span>{{ item.type }}</span>
      </el-form-item>
      <el-form-item label="编号:">
        <span>{{ item.No }}</span>
      </el-form-item>
      <el-form-item label="状态:">
        <span>{{ item.status }}</span>
      </el-form-item>
      <el-form-item label="位置:">
        <span>{{ item.location }}</span>
      </el-form-item>
      <el-form-item label="规格:">
        <span>{{ item.spec }}</span>
      </el-form-item>
      <el-form-item label="注册:">
        <span>{{ item.regTime }}</span>
      </el-form-item>
    </el-form>

  </el-card>

</template>

<script>
export default {
  name: 'Card',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: '1',
          name: '无人机1',
          status: 'fault',
          type: 'UAV',
          No: '1824',
          location: '127.1',
          spec: '8086',
          regTime: '2020/10/29'
        }
      }
    }
  },
  computed: {
    headerClass() {
      const className = ''
      switch (this.item.status) {
        case 'free': break
        case 'task': break
        case 'fault': break
      }
      return className
    }
  }
}
</script>
<style  lang="scss"  >
.box-card {
  width: 280px;
  margin-top: 20px;
  .el-card__header {
    padding: 0;
  }
}
.body {
  padding: 0 20px;
  .el-form-item {
    margin-bottom: 8px;
  }
}

.header {
  padding: 18px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  span {
    color: #ffffff;
  }
}
.free {
  background: #13ce66;
}

.task {
  background: #ffba00;
}

.fault {
  background: #ff4949;
}

.free-border {
  border: 1px solid #67c23a;
}

.task-border {
  border: 1px solid #e6a23c;
}

.fault-border {
  border: 1px solid #f56c6c;
}
</style>
