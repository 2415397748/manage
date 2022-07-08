<template>
  <div>
    <!-- 左侧导航 -->
    <el-menu :default-active="pashIndex"
             class="dbdaohang"
             mode="horizontal"
             style="background-color: #b3c0d1;"
             @select="handleSelect">
      <el-menu-item v-for="(item,index) in headProp.list"
                    :index="'leftNavigation'+(index+1)"
                    :key="index"
                    style="font-size: 25px;color: #333;">
        {{item.name}}
      </el-menu-item>
      <!-- 右侧按钮 -->
      <el-dropdown v-if="headProp.exitSwitch"
                   trigger="click"
                   style="margin-right: 15px;color: #fff;position: absolute;right: 0;top: 0;">
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text"
                       style="width: 100%;"
                       @click="lockScreen">锁屏</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text"
                       style="width: 100%;"
                       @click="logInLogout">退出登录</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['headProp'],
  name: 'headNavigation',
  data() {
    return {
      pashIndex: 'leftNavigation1',
    }
  },
  created() {
    // console.log('headprop', this.$props.headprop)
    // this.activeIndex = index;
    // console.log(this.pashIndex)
  },
  methods: {
    //退出登录
    logInLogout() {
      this.$store.dispatch('logout')
      this.$router.go(0)
    },
    //头部选择
    handleSelect(index) {
      this.pashIndex = index
      //兄弟组件传值
      // this.$bus.$emit('select',this.pashindex);
      //给父亲组件传值并传入调用方法
      this.$emit('selects', this.pashIndex)
    },
    lockScreen() {
      //组件传值方式开启关闭锁屏
      this.$bus.$emit('lockScreen')
      //改变store中的属性开启关闭锁屏
      //   this.$store.dispatch('timerIn')
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  color: #409eff;
}
.dbdaohang .el-button {
  font-size: 20px;
  padding: 0 10px;
}

.toubu {
  color: #333;
}

.toubu i {
  line-height: 60px;
  font-size: 30px;
}

.el-footer,
.toubu {
  color: #333;
}
</style>
