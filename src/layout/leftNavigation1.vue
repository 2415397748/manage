<template>
  <el-aside width="300px"
            style="background-color: rgb(238, 241, 246)"
            draggable>
    <el-menu><img src="@/img/logo.png"
           style="font-size: 1.25rem;"></el-menu>
    <!-- default-openeds默认展开 -->
    <el-menu :default-active="defaultActive"
             @select="menuClick">
      <el-menu-item index="dataCollect"><i class="el-icon-pie-chart"></i>数据汇总</el-menu-item>
      <el-menu-item index="userControl"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>
      <el-menu-item index="rightControl"><i class="el-icon-setting"></i>权限管理</el-menu-item>
      <el-menu-item index="quickMark"><i class="el-icon-full-screen"></i>二维码</el-menu-item>
      <el-submenu index="商品管理">
        <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
        <el-menu-item-group>
          <el-menu-item index="commodityList"><i class="el-icon-menu"></i>商品列表</el-menu-item>
          <el-menu-item index="classifyControl"><i class="el-icon-menu"></i>分类管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="orderControl"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'leftNavigation1',
  data() {
    return {
      defaultActive: '用户管理',
      value: '',
    }
  },
  created() {
    this.menu()
  },
  //   mounted() {
  //     获取兄弟组件传入的值
  //     this.$bus.$on('select',val=>{
  //     this.value=val;
  //     console.log(this.value,'leftNavigation1');
  //     })
  //   },
  methods: {
    //左侧菜单根据路由高亮
    menu() {
      this.defaultActive = this.$route.name
    },
    //点击菜单路由替换
    menuClick(index) {
      this.$router.push(index)
    },
  },
}
</script>

<style lang="sass"  scoped>
a
    text-decoration: none
    color: #333

a:focus
    color: #4fa9fd

.el-aside
    background-color: #333
</style>>
