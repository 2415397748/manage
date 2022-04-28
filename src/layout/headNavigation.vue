<template>
  <el-header class="toubu navigation"
             style="background-color: #b3c0d1;text-align: right;">
    <!-- 左侧导航 -->
    <el-menu :default-active="pashIndex"
             class="dbdaohang"
             mode="horizontal"
             @select="handleSelect"
             style="position: absolute;left: 20rem;background-color:  rgb(179, 192, 209)">
      <el-menu-item v-for="(item,index) in headProp.list"
                    :index="'leftNavigation'+(index+1)"
                    :key="index"
                    style="font-size: 25px;;color: #333;">
        {{item.name}}
      </el-menu-item>
    </el-menu>
    <!-- 右侧按钮 -->
    <el-dropdown v-if="headProp.exitSwitch"
                 trigger="click">
      <i class="el-icon-setting"
         style="margin-right: 15px;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button type="text"
                     @click="handleLogout">退出登录</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
import { headNavigation } from '../main'
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
    handleLogout() {
      this.$store.dispatch('logout')
      this.$router.go(0)
    },
    handleSelect(index) {
      this.pashIndex = index
      //兄弟组件传值
      // this.$bus.$emit('select',this.pashindex);
      //给父亲组件传值并传入调用方法
      this.$emit('selects', this.pashIndex)
    },
  },
}
</script>

<style>
.navigation {
  color: #409eff;
  /* display: inline-block; */
}
.dbdaohang .el-button {
  font-size: 20px;
  padding: 0 10px;
}

.toubu {
  height: 60px;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.toubu i {
  line-height: 60px;
  font-size: 30px;
}

.el-footer,
.toubu {
  color: #333;
  line-height: 60px;
}
</style>
