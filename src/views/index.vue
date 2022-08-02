<template>
  <div class="home">
    <!-- <el-button @click="skip()">点我显示head.value</el-button> -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <!-- 左侧导航栏 -->
      <component :is="head.value"
                 :key="head.value"></component>

      <el-container>
        <!-- 上方导航栏 -->
        <el-header class="toubu"
                   style="background-color: #b3c0d1;">
          <head-navigation :headProp.sync="head"
                           @selects='skip'>
          </head-navigation>
        </el-header>
        <!-- 页面主要内容 -->
        <div class="navigation">
          <!-- 路由导航 -->
          <el-tabs v-model="routeEditableTabsValue"
                   type="card"
                   closable
                   @tab-click="tabClick"
                   @tab-remove="removeTab">
            <el-tab-pane v-for="(item) in routeNavigation"
                         :key="item.key"
                         :label="item.name"
                         :name="item.title">
            </el-tab-pane>
          </el-tabs>
          <!-- 页面主要内容 -->
          <router-view></router-view>
        </div>
      </el-container>
    </el-container>
  </div>

</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      head: {
        list: [
          {
            id: '1',
            slot: 'home',
            name: '首页',
          },
          {
            id: '2',
            slot: 'two',
            name: '第二页',
          },
          {
            id: '3',
            slot: 'three',
            name: '第三页',
          },
          {
            id: '4',
            slot: 'four',
            name: '第四页',
          },
        ],
        exitSwitch: true,
        value: 'leftNavigation1',
      },
      routeEditableTabsValue: '1',
      tabIndex: 2,
    }
  },
  created() {},
  methods: {
    //上方导航栏点击事件,切换左侧对应路由
    skip(val) {
      this.head.value = val
    },
    //点击路由导航跳转对应路由
    tabClick(tab) {
      this.$router.push(tab.name)
    },
    //获取对应下标并删除对应路由导航
    removeTab(targetName) {
      let tabs = this.routeNavigation
      const index = tabs.findIndex((tab) => tab.title == targetName)
      this.$store.dispatch('routeNavigationRemove', index)
    },
  },
  computed: {
    routeNavigation() {
      return this.$store.state.routeNavigation
    },
  },
}
</script>
<style lang="scss" scoped>
body {
  min-width: 800px;
  overflow-y: hidden;
  overflow-x: auto;
}

.home {
  // 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。怪异盒子
  width: 100%;
  height: 100%;
}

.el-main {
  padding: 0;
  padding-top: 0.625rem;
}

.navigation {
  text-align: left;
}
</style>

