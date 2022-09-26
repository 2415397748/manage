<template>
	<div id="app">
		<router-view />
		<div class="date" v-if="timerSwitch" @click="unlocking()">
			{{ date }}
		</div>
		<!-- 锁屏 -->
		<el-dialog
			:title="`设置${!timerSwitch ? '锁屏' : '解锁'}密码`"
			:visible.sync="centerDialogVisible"
			:close-on-click-modal="false"
			width="30%"
			center
			:before-close="openHandleClose"
		>
			<el-input
				v-model="password"
				clearable
				:placeholder="`请输入${!timerSwitch ? '锁屏' : '解锁'}密码`"
			></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false"
					>取 消</el-button
				>
				<el-button type="primary" @click="handleClose">确 定</el-button>
				<el-button type="danger" @click="prompt" v-if="timerSwitch">
					忘 记 密 码
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			date: '',
			timer: null,
			centerDialogVisible: false,
			password: '',
			lockPassword: '',
		};
	},
	async created() {
		//组件传值方式开启关闭锁屏
		this.$bus.$on('lockScreen', () => {
			this.centerDialogVisible = true;
			this.password = '';
		});
		//获取锁屏密码
		this.lockPassword = this.timerPassword;
	},
	methods: {
		timeFormate(timeStamp) {
			let year = new Date(timeStamp).getFullYear();
			let month =
				new Date(timeStamp).getMonth() + 1 < 10
					? '0' + (new Date(timeStamp).getMonth() + 1)
					: new Date(timeStamp).getMonth() + 1;
			let date =
				new Date(timeStamp).getDate() < 10
					? '0' + new Date(timeStamp).getDate()
					: new Date(timeStamp).getDate();
			let hh =
				new Date(timeStamp).getHours() < 10
					? '0' + new Date(timeStamp).getHours()
					: new Date(timeStamp).getHours();
			let mm =
				new Date(timeStamp).getMinutes() < 10
					? '0' + new Date(timeStamp).getMinutes()
					: new Date(timeStamp).getMinutes();
			let ss =
				new Date(timeStamp).getSeconds() < 10
					? '0' + new Date(timeStamp).getSeconds()
					: new Date(timeStamp).getSeconds();
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
				ss;
		},
		//通过定时器显示当前日期时间
		showDate() {
			this.timeFormate(new Date());
			// 声明一个变量指向Vue实例this，保证作用域一致
			const _this = this;
			this.timer = setInterval(() => {
				_this.timeFormate(new Date()); // 修改数据date
			}, 1000);
		},
		//打开锁屏解锁的输入框，根据传入的值判断直接修改锁屏或者关闭锁屏的状态以及输入框的值
		openHandleClose() {
			this.centerDialogVisible = false;
		},
		//锁屏判断
		async handleClose() {
			//根据timerSwitch判断是锁屏还是解锁
			if (!this.timerSwitch) {
				if (this.password.length >= 3) {
					//改变store中的属性开启关闭锁屏
					this.lockPassword = this.password;
					this.centerDialogVisible = false;
					await this.$store.dispatch('timerIn');
					await this.$store.dispatch(
						'timerPassword',
						this.lockPassword
					);
				} else {
					this.$message({
						message: '密码长度要大于3',
						type: 'warning',
						duration: 1000,
						showClose: true,
						center: true,
					});
				}
			} else {
				if (this.lockPassword === this.password) {
					this.centerDialogVisible = false;
					await this.$store.dispatch('timerOut');
				} else {
					this.$message({
						message: '密码错误',
						type: 'warning',
						duration: 1000,
						showClose: true,
						center: true,
					});
				}
			}
		},
		//关闭锁屏
		unlocking() {
			this.password = '';
			this.centerDialogVisible = true;
		},
		//忘记密码的提示
		prompt() {
			this.$message({
				message: '密码为: ' + this.lockPassword,
				type: 'warning',
				duration: 1000,
				showClose: true,
				center: true,
			});
		},
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	computed: {
		//通过修改store.state.timerSwitch的值修改锁屏状态
		timerSwitch() {
			if (this.$store.state.timerSwitch) this.showDate();
			else this.timer = null;
			return this.$store.state.timerSwitch;
		},
		timerPassword() {
			return this.$store.state.timerPassword;
		},
	},
	watch: {
		// // 立即处理 进入页面就触发
		// immediate: true,
	},
};
</script>

<style lang="scss">
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
