<template>
  <div id="app">
    <router-view />
    <div class='date'
         v-if="timerSwitch"
         @click="unlocking()">
      {{date}}
    </div>
    <!-- 锁屏 -->
    <el-dialog title="设置密码"
               :visible.sync="centerDialogVisible"
               width="30%"
               center
               :before-close="handleClose">
      <el-input v-model="password"
                placeholder=""></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 解锁 -->
    <!-- <el-dialog title="请输入密码"
               :visible.sync="DialogVisible"
               width="30%"
               center
               :before-close="handleClose">
      <el-input v-model="password"
                placeholder=""></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleClose">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      date: '',
      timerSwitch: false,
      timer: null,
      centerDialogVisible: false,
      password: '',
    }
  },
  mounted() {
    //组件传值方式开启关闭锁屏
    this.$bus.$on('lockScreen', () => {
      this.centerDialogVisible = true
    })
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? '0' + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1
      let date =
        new Date(timeStamp).getDate() < 10
          ? '0' + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate()
      let hh =
        new Date(timeStamp).getHours() < 10
          ? '0' + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours()
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? '0' + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes()
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? '0' + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds()
      this.date =
        year +
        '年' +
        month +
        '月' +
        date +
        '日' +
        ' ' +
        hh +
        ':' +
        mm +
        ':' +
        ss
    },
    //通过定时器显示当前日期时间
    showDate() {
      this.timeFormate(new Date())
      // 声明一个变量指向Vue实例this，保证作用域一致
      const _this = this
      this.timer = setInterval(() => {
        _this.timeFormate(new Date()) // 修改数据date
      }, 1000)
    },
    //关闭锁屏并且关闭定时器
    unlocking() {
      //   this.$store.dispatch('timerOut')
      this.timerSwitch = false
      clearInterval(this.timer)
      this.timer = null
    },
    handleClose(done) {
      this.$confirm('确定要提交吗？')
        .then((_) => {
          if (this.password.length > 3 && this.password) {
            this.timerSwitch = true
            this.centerDialogVisible = false
            this.showDate()
            done()
          } else {
            this.$message({
              message: '密码长度要大于3',
              type: 'warning',
              duration: 1000,
              showClose: true,
              center: true,
            })
          }
        })
        .catch((_) => {})
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  computed: {
    switchs() {
      return this.$store.state.timerSwitch
    },
  },
}
</script>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

div.date {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 弹性盒子 */
  display: flex;
  font-size: 8rem;
  /* 在容器中央对齐弹性项目 */
  justify-content: center;
  /* align-items是垂直方向的对齐方式 */
  align-items: center;
  background: rgba(0, 0, 0, 1);
  z-index: 100;
  color: white;
}
</style>
