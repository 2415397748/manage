<template>
	<div class="about">
		<!-- 登录页面 -->
		<!-- prop:1.在 标签中绑定 :rules=“方法名称”,然后在 data 里写规则
		2.在 标签绑定 prop=“规则名”
		 validate-event:验证事件-->
		<el-form ref="form" :model="form" label-width="200px" :rules="rules">
			<el-form-item label="账号" prop="account"><i class="el-icon-user-solid"
					style="font-size: 1.2rem; line-height: 2.5rem;"></i>
				<el-input v-model="form.account" validate-event placeholder="请输入账号"
					@keydown.enter.native="submitForm(form.account,form.password)" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password"><i class="el-icon-lock"
					style="font-size: 1.2rem; line-height: 2.5rem;"></i>
				<!-- 使用show-password属性即可得到一个可切换显示隐藏的密码框 -->
				<el-input v-model="form.password" show-password validate-event placeholder="请输入密码"
					@keydown.enter.native="submitForm(form.account,form.password)" style="width: 300px;"></el-input>
			</el-form-item>
			<!-- 验证码 -->
			<el-form-item prop="verifycode" style="line-height:0px;" class="VerificationCode">
				<div class="identifybox" @click="refreshCode">
					<sidentify :identifyCode="identifyCode"></sidentify>
				</div>
				<el-input v-model="form.verifycode" ref="verifycode" placeholder="验证码" class="identifyinput"
					style="width:230px;" @keydown.enter.native="submitForm(form.account,form.password)"></el-input>
			</el-form-item>
			<el-form-item>
				<!-- type控制按钮颜色 -->
				<el-button type="primary" @click="submitForm(form.account,form.password);loginBtn()">登录</el-button>
				<el-button @click="resetForm(form.account, form.password)">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import sidentify from "./sidentify.vue";


	export default {
		
		components: { sidentify },
		data() {
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
			// 验证码自定义验证规则
			const validateVerifycode = (rule, value, callback) => {
				// rule 对应使用bargainMoney自定义验证的 对象
				// value 对应使用bargainMoney自定义验证的 数值 
				// callback 回调函数
				if (value === "") {
					callback(new Error('请输入验证码'))
				} else if (value !== this.identifyCode) {
					// console.log('验证码:', value);
					callback(new Error('验证码不正确!'))
				} else {
					callback()
				}
			};
			return {
				//form表单input数据绑定
				form: {
					account: '',
					password: '',
					verifycode: '',
				},
				identifyCodes: "1234567890", //验证码的数字库
				identifyCode: "", // 验证码组件传值
				sjk: [{
					account: 'admin',
					password: 'admin123',
				}, ],
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
					],
					//规则验证
					verifycode: [{
						required: true,
						trigger: 'blur',
						validator: validateVerifycode
					}]
				}
			}
		},
		created() {

		},
		methods: {
			submitForm(...age) {
				//登录判断是否是存在的账号密码
				const yes = this.$data.sjk.filter(items => items.account === age[0] && items.password === age[1]);
				//this.$refs是一个对象，持有当前组件中注册过 ref特性的所有 DOM 元素和子组件实例
				// validate表单验证方法调用
				console.log(yes)
				this.$refs.form.validate().then(res => {
					// $message全局方法 ,消息提示
					if (yes.length > 0) {
						this.$message({
							message: '登录成功',
							type: 'success',
							duration: 2000,
						});
						//替换路由
						//this.$router.push('/home');
						this.$router.push({path: '/home'});
					} else {
						this.$message({
							message: '',
							message: '登录失败 没有账号可以先注册哦',
							type: 'warning',
							duration: 2000,
						});
					}
				}).catch(err => {
					this.$message({
						message: '登录失败',
						type: 'warning',
						duration: 1000,
					});
				});
				this.refreshCode();
			},
			//注册的判断，是否和数据库账号重合
			resetForm(...age) {
				const account = this.sjk.filter(items => items.account === age[0]);
				this.$refs.form.validate().then(res => {
					if (account.length > 0) {
						this.$message({
							message: '用户名已存在',
							type: 'warning',
							duration: 2000,
						});
					} else {
						const Newaccount = {
							account: age[0],
							password: age[1],
						};
						this.sjk.push(Newaccount);
						this.$message({
							message: '注册成功',
							type: 'success',
							duration: 2000,
						});
						console.log(this.sjk);
					}
				}).catch(err => {
					this.$message({
						message: '注册失败',
						type: 'warning',
						duration: 1000,
					});
				});
				this.refreshCode();
			},
			
			//验证码----start
			randomNum(min, max) {
				//产生一个随机整数，范围在
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
				// console.log("this.identifyCode:", this.identifyCode);
			},
			//验证码----end
			loginBtn () {
			    // 表单预验证
			    // this.$refs.form.validate(async valid => {
			    //   if (!valid) return
			    //   // 验证通过，发起登录请求
			    //   const { data: res } = await this.$http.post('home', this.form)
			    //   if (res.meta.status !== 200) return this.$message.error('登录失败')
			    //   this.$message.success('登录成功')
			    //   // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
			    //   //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
			    //   //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
			    //   window.sessionStorage.setItem('token', res.data.token)
			    //   // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
			    //   this.$router.push('/home')
			    // })
			  }
		},

		created() {
			this.refreshCode(); //初始化验证码
		},

		mounted() {
			// 验证码初始化
			this.identifyCode = '';
			this.makeCode(this.identifyCodes, 4);
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
		background-image: url(../img/denglu.jpeg);
		background-size: 100%;
	}

	.el-form {
		background-color: #ffffff;
		padding-right: 8rem;
		padding-top: 5rem;
		padding-bottom: 2.5rem;
		line-height: 2.5rem;
	}
	.VerificationCode{
		text-align : center;
	}
	.VerificationCode div:nth-child(1),.VerificationCode div:nth-child(2){
		display: inline-block;
		position: relative;
		left: -0.9375rem;
	}
	.VerificationCode div:nth-child(2){
		top: -0.625rem;
	}
</style>
