<template>
	<div id="app">
		<router-view></router-view>
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	</div>
</template>

<script>
	
</script>

<style>
	html,
	body {
		height: 100%;
		box-sizing: border-box;
	}
	#app{
		height: 100%;
		/* margin-top: 60px; */
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		/* 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。怪异盒子 */
		box-sizing: border-box;
	}
</style>
