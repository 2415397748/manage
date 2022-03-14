<template>
	<div class="about">
		<!-- 登录页面 -->
		<!-- prop:1.在 标签中绑定 :rules=“方法名称”,然后在 data 里写规则
		2.在 标签绑定 prop=“规则名”
		 validate-event:验证事件-->
		<el-form ref="form" :model="form" label-width="200px" :rules="rules">
			<el-form-item label="账号" prop="account"><i class="el-icon-user-solid"></i>
				<el-input v-model="form.account" validate-event placeholder="请输入账号" @keydown.enter.native="submitForm(form.account,form.password)" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password"><i class="el-icon-user-solid"></i>
				<!-- 使用show-password属性即可得到一个可切换显示隐藏的密码框 -->
				<el-input v-model="form.password" show-password validate-event placeholder="请输入密码" @keydown.enter.native="submitForm(form.account,form.password)"  style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item>
				<!-- type控制按钮颜色 -->
				<el-button type="primary" @click="submitForm(form.account,form.password)">登录</el-button>
				<el-button @click="resetForm(form.account, form.password)">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	// 自定义校验规则
	const customEvents = (rule, value, callback) => {
		// rule 对应使用bargainMoney自定义验证的 对象
		// value 对应使用bargainMoney自定义验证的 数值 
		// callback 回调函数
		const r = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/; // 要求：由数字和字母组成，并且要同时含有数字和字母，且长度要在8-16位之间。
		if (value === null || value.trim() === "") {
			callback(new Error("不能为空"));
		} else if (!r.test(value)) {
			callback(new Error("密码由有数字和字母组成，且长度要在5-10位之间"));
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
					password: '',
				},
				sjk : [
					{
						account: 'admin',
						password: 'admin123',
					},
					{
						account: 'fangbin',
						password: 'fangbin123',
					},
				],
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
			
		},
		methods: {
			submitForm(...age){
				const account =this.sjk.filter(items => items.account === age[0] && items.password === age[1]);
				//this.$refs是一个对象，持有当前组件中注册过 ref特性的所有 DOM 元素和子组件实例
				// validate表单验证方法调用
				this.$refs.form.validate().then(res => {
					// $message全局方法 ,消息提示
					if(account.length>0){
						this.$message({
							message: '登录成功',
							type: 'success',
							duration:2000,
						});
						//替换路由
						this.$router.push('/home');
					}else{
						this.$message({
							message: '',
							message: '登录失败 没有账号可以先注册哦',
							type: 'warning',
							duration:2000,
						});
					}
				}).catch(err => {
					this.$message({
						message: '登录失败',
						type: 'warning',
						duration:1000,
					});
				})
			},
			resetForm(...age) {
				const account =this.sjk.filter(items => items.account === age[0]);
				this.$refs.form.validate().then(res => {
					if(account.length>0){
						this.$message({
							message: '用户名已存在',
							type: 'warning',
							duration:2000,
						});
					}else{
						const Newaccount = {
							account: age[0],
							password: age[1],
						};
						this.sjk.push(Newaccount);
						this.$message({
							message: '注册成功',
							type: 'success',
							duration:2000,
						});
						console.log(this.sjk)
					}
				}).catch(err => {
					this.$message({
						message: '注册失败',
						type: 'warning',
						duration:1000,
					});
				})
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
		/* background-image:url(../img/denglu.jpeg); */
	}
	.el-form{
		border: #000000 solid 1px;
		padding-right: 10rem;
	}
</style>
