<template>
  <div class="home">
    <!-- <el-button @click="skip()">点我显示head.value</el-button> -->
    <el-container style="height: 100%; border: 1px solid #eee">
      <component :is="head.value"></component>

      <el-container>
        <!-- 上方导航栏 -->
        <el-header class="toubu"
                   style="background-color: #b3c0d1;text-align: right;">
          <head-navigation :headProp.sync="head"
                           @selects='skip'>
          </head-navigation>
        </el-header>
        <!-- 页面主要内容 -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>

</template>
<script>
export default {
  data() {
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // };
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
    }
  },
  created() {},
  methods: {
    skip(val) {
      this.head.value = val
    },
  },
}
</script>
	
<style>
html,
body {
  box-sizing: border-box;
}

body {
  min-width: 800px;
  overflow-y: hidden;
  overflow-x: auto;
  /*max-width:100%;*/
}

.home {
  /* 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。怪异盒子 */
  width: 100%;
  height: 100%;
}

/* .toubu span{
		position: absolute;
		left: 20rem;
		color: #409EFF;
	} */

.el-main {
  padding: 0;
  padding-top: 0.625rem;
}
</style>
