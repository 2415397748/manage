<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="sass" scoped>
html,
body
    width: 100%
    height: 100%
    box-sizing: border-box
    margin: 0
    padding: 0

#app
    width: 100%
    height: 100%
    margin: 0
    padding: 0
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    // 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。怪异盒子
    box-sizing: border-box
</style>
