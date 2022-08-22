<template>
	<div
		class="table"
		v-loading="loading"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(255, 255, 255, 1)"
	>
		<!-- 登录页面 -->
		<!-- prop:1.在 标签中绑定 :rules=“方法名称”,然后在 data 里写规则
		2.在 标签绑定 prop=“规则名”
		 validate-event:验证事件-->
		<el-form ref="form" :model="form" label-width="200px" :rules="rules">
			<el-form-item label="账号" prop="account"
				><i
					class="el-icon-user-solid"
					style="font-size: 1.2rem; line-height: 2.5rem"
				></i>
				<el-input
					v-model="form.account"
					validate-event
					placeholder="请输入账号"
					@keydown.enter.native="
						submitForm(form.account, form.password)
					"
					style="width: 300px"
				></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password"
				><i
					class="el-icon-lock"
					style="font-size: 1.2rem; line-height: 2.5rem"
				></i>
				<!-- 使用show-password属性即可得到一个可切换显示隐藏的密码框 -->
				<el-input
					v-model="form.password"
					show-password
					validate-event
					placeholder="请输入密码"
					@keydown.enter.native="
						submitForm(form.account, form.password)
					"
					style="width: 300px"
				></el-input>
			</el-form-item>
			<!-- 验证码 -->
			<el-form-item
				prop="verifyCode"
				style="line-height: 0px"
				class="VerificationCode"
			>
				<div class="identifybox" @click="refreshCode">
					<verificationCode
						:identifyCode="identifyCode"
					></verificationCode>
				</div>
				<el-input
					v-model="form.verifyCode"
					ref="verifyCode"
					placeholder="验证码"
					class="identifyinput"
					style="width: 230px"
					@keydown.enter.native="
						submitForm(form.account, form.password)
					"
				></el-input>
			</el-form-item>
			<el-form-item>
				<!-- type控制按钮颜色 -->
				<el-button
					type="primary"
					@click="submitForm(form.account, form.password)"
					>登录</el-button
				>
				<el-button @click="resetForm(form.account, form.password)"
					>注册</el-button
				>
			</el-form-item>
			<el-form-item>
				<h3>账号:admin&ensp;&ensp;密码:admin123</h3>
				<h3>账号:admin&ensp;&ensp;密码:admin123</h3>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'logIn',
	data() {
		// 自定义校验规则
		const customEvents = (rule, value, callback) => {
			// rule 对应使用bargainMoney自定义验证的 对象
			// value 对应使用bargainMoney自定义验证的 数值
			// callback 回调函数
			const r = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/;
			// 要求：由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间。
			if (value === null || value.trim() === '') {
				callback(new Error('不能为空'));
			} else if (!r.test(value)) {
				callback(
					new Error('密码由有数字和字母组成，且长度要在5-10位之间')
				);
			} else {
				callback();
			}
		};
		// 验证码自定义验证规则
		const validateVerifyCode = (rule, value, callback) => {
			// rule 对应使用bargainMoney自定义验证的 对象
			// value 对应使用bargainMoney自定义验证的 数值
			// callback 回调函数
			if (value === '') {
				callback(new Error('请输入验证码'));
			} else if (value !== this.identifyCode) {
				callback(new Error('验证码不正确!'));
			} else {
				callback();
			}
		};
		return {
			loading: false,
			//form表单input数据绑定
			form: {
				account: '',
				password: '',
				verifyCode: '',
			},
			identifyCodes: '1234567890', //验证码的数字库
			identifyCode: '', // 验证码组件传值
			MySQL: [
				{
					account: 'admin',
					password: 'admin123',
				},
			],
			//设置登录的规则，required为必填项
			//trigger: 'blur'失去焦点触发
			rules: {
				account: [
					{
						required: true,
						message: '请输入账号',
						trigger: 'blur',
					},
					{
						min: 5,
						max: 8,
						message: '长度在 5 到 10 个字符',
						trigger: 'blur',
					},
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
					},
					{
						min: 5,
						max: 10,
						message: '长度在 5 到 10 个字符',
						trigger: 'blur',
					},
					{
						validator: customEvents,
						trigger: 'blur',
					},
				],
				//规则验证
				verifyCode: [
					{
						required: true,
						trigger: 'blur',
						validator: validateVerifyCode,
					},
				],
			},
		};
	},

	created() {
		//初始化验证码
		this.refreshCode();
		//验证是否登录过
		// this.verifyLogin()
	},
	methods: {
		//验证是否登录过
		verifyLogin() {
			if (this.$store.state.token) {
				this.$router.push('/index/dataCollect');
			}
		},
		submitForm(...age) {
			//登录判断是否是存在的账号密码
			const account = this.$data.MySQL.filter(
				(items) => items.account === age[0] && items.password === age[1]
			);
			//this.$refs是一个对象，持有当前组件中注册过 ref特性的所有 DOM 元素和子组件实例
			// validate表单验证方法调用
			this.$refs.form
				.validate()
				.then((res) => {
					// $message全局方法 ,消息提示
					if (account.length > 0) {
						this.$message({
							message: '登录成功',
							type: 'success',
							duration: 2000,
							showClose: true,
							center: true,
						});
						//模拟登录加载
						this.loading = true;
						this.$store.dispatch('login', this.form.account);
						this.$router.push('/index/dataCollect');
						setTimeout(() => {
							//替换路由
							this.$router.push('/index/dataCollect');
						}, 200);
					} else {
						this.$message({
							message: '登录失败 没有账号可以先注册哦',
							type: 'warning',
							duration: 2000,
							showClose: true,
							center: true,
						});
						this.form.verifyCode = '';
					}
				})
				.catch((err) => {
					console.error(err);
					this.$message({
						message: '登录失败',
						type: 'warning',
						duration: 1000,
						showClose: true,
						center: true,
					});
					this.form.verifyCode = '';
				});
			this.refreshCode();
		},
		//注册的判断，是否和数据库账号重合
		resetForm(...age) {
			const account = this.MySQL.filter(
				(items) => items.account === age[0]
			);
			this.$refs.form
				.validate()
				.then((res) => {
					if (account.length > 0) {
						this.$message({
							message: '用户名已存在',
							type: 'warning',
							duration: 2000,
							showClose: true,
							center: true,
						});
						this.form.verifyCode = '';
					} else {
						const Newaccount = {
							account: age[0],
							password: age[1],
						};
						this.MySQL.push(Newaccount);
						this.$message({
							message: '注册成功',
							type: 'success',
							duration: 2000,
							showClose: true,
							center: true,
						});
						this.form.verifyCode = '';
					}
				})
				.catch((err) => {
					console.error(err);
					this.$message({
						message: '注册失败',
						type: 'warning',
						duration: 1000,
						showClose: true,
						center: true,
					});
					this.form.verifyCode = '';
				});
			this.refreshCode();
		},

		//验证码----start
		randomNum(min, max) {
			//产生一个随机整数，范围在
			return Math.floor(Math.random() * (max - min) + min);
		},
		refreshCode() {
			this.identifyCode = '';
			this.makeCode(this.identifyCodes, 4);
		},
		//验证码----end
		makeCode(o, l) {
			for (let i = 0; i < l; i++) {
				this.identifyCode +=
					this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
			}
		},
	},

	mounted() {
		// 验证码初始化
		this.identifyCode = '';
		this.makeCode(this.identifyCodes, 4);
	},
};
</script>
<style>
/* 加载样式 */
.el-loading-spinner {
	font-size: 12.5rem;
	position: relative;
	top: 20rem;
}
</style>
<style scoped lang="scss">
.table {
	width: 100%;
	height: 100%;
	/* 弹性盒子 */
	display: flex;
	/* 在容器中央对齐弹性项目 */
	justify-content: center;
	/* align-items是垂直方向的对齐方式 */
	align-items: center;
	background-image: url(@/img/logIn.jpeg);
	background-size: 100%;
}

.el-form {
	background-color: #ffffff;
	padding-right: 10rem;
	padding-top: 5rem;
	line-height: 2.5rem;
}
.VerificationCode div:nth-child(1),
.VerificationCode div:nth-child(2) {
	display: inline-block;
	position: relative;
	left: -0.9375rem;
}
.VerificationCode div:nth-child(2) {
	top: -0.625rem;
}
.el-loading-spinner .el-loading-text {
	font-size: 3rem;
}
</style>
