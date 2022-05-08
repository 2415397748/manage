<template>
  <el-aside width="300px"
            style="background-color: rgb(238, 241, 246)"
            draggable>
    <el-menu><img src="../img/logo.png"
           style="font-size: 1.25rem;"></el-menu>
    <!-- default-openeds默认展开 -->
    <el-menu :default-openeds="[]"
             default-active="1-1">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>权限管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'leftNavigation2',
}
</script>

<style lang="sass" scoped>
.el-aside
    background-color: #333
</style>
