<template>
  <el-aside width="300px"
            style="background-color: rgb(238, 241, 246)"
            draggable>
    <el-menu><img src="../img/logo.png"
           style="font-size: 1.25rem;"></el-menu>
    <!-- default-openeds默认展开 -->
    <el-menu default-active="2-1">
      <router-link :to="{name:'用户管理'}">
        <el-menu-item index="1-1"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>
      </router-link>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>权限管理</template>
        <el-menu-item-group>
          <router-link :to="{name:'角色列表'}">
            <el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
          </router-link>
          <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类管理</el-menu-item>
          <el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4-1"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
      <el-menu-item index="5-1"><i class="el-icon-s-platform"></i>数据列表</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'leftNavigation1',
  data() {
    return {
      value: '',
    }
  },
  created() {},
  mounted() {
    //获取兄弟组件传入的值
    // this.$bus.$on('select',val=>{
    // this.value=val;
    // console.log(this.value,'leftNavigation1');
    // })
  },
  // mounted:{

  // }
}
</script>

<style>
a {
  text-decoration: none;
  color: #333;
}
a:focus {
  color: #4fa9fd;
}
.el-aside {
  background-color: #333;
}
</style>
