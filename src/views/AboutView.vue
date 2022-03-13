<template>
	<div class="about">
		<!-- 登录页面 -->
		<!-- prop:1.在 标签中绑定 :rules=“方法名称”,然后在 data 里写规则
		2.在 标签绑定 prop=“规则名”
		 validate-event:验证事件-->
		<el-form ref="form" :model="form" label-width="200px" :rules="rules">
			<el-form-item label="账号" prop="account">
				<el-input v-model="form.account" validate-event placeholder="请输入账号" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<!-- 使用show-password属性即可得到一个可切换显示隐藏的密码框 -->
				<el-input v-model="form.password" show-password validate-event placeholder="请输入密码" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				<el-button @click="resetForm(form.account, form.password)">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	// 自定义校验规则
	let customEvents = (rule, value, callback) => {
		// rule 对应使用bargainMoney自定义验证的 对象
		// value 对应使用bargainMoney自定义验证的 数值 
		// callback 回调函数
		const r = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/; // 要求：由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间。
		if (value === null || value.trim() === "") {
			callback(new Error("不能为空"));
		} else if (!r.test(value)) {
			callback(new Error("密码需同时含有数字和字母，且长度要在5-10位之间"));
		} else {
          callback();
        }
	}
	export default {
		data() {
			return {
				//form表单input数据绑定
				form: {
					account: '',
					password: ''
				},
				// custom: (rule, value, callback) => {
				// 	console.log(rule)
				// },
				//设置登录的规则，required为必填项
				//trigger: 'blur'失去焦点触发
				rules: {
					account: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 10,
							message: '长度在 5 到 10 个字符',
							trigger: 'blur'
						},

					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 10,
							message: '长度在 5 到 10 个字符',
							trigger: 'blur'
						},
						{
							validator: customEvents,
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			// this.custom('123')
		},
		methods: {
			submitForm() {
				//this.$refs是一个对象，持有当前组件中注册过 ref特性的所有 DOM 元素和子组件实例
				// validate表单验证方法调用
				this.$refs.form.validate().then(res => {
					// $message全局方法
					this.$message({
						message: '登录成功',
						type: 'success',
						duration:1000,
					});
					//跳转路由
					//this.$router.replace('/about')
					//替换路由
					this.$router.push('/home')
				}).catch(err => {
					this.$message({
						message: '登录失败',
						type: 'warning',
					});
				})
				// console.log('submit!');

			},
			resetForm(...age) {
				console.log(age);
			}
		}
	}
</script>
<style>
	.about {
		width: 100%;
		height: 100%;
		/* 弹性盒子 */
		display: flex;
		/* 在容器中央对齐弹性项目 */
		justify-content: center;
		/* align-items是垂直方向的对齐方式 */
		align-items: center;
	}
</style>
